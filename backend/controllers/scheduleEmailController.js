import Campaign from '../models/Campaign.js';
import agenda from '../config/agenda.js';
import { defineEmailJob } from '../emailJob.js';

defineEmailJob(agenda);

export const scheduleEmail = async (req, res) => {
  try {
    const { campaignId, createdAt, delayMinutes } = req.body;

    const campaign = await Campaign.findById(campaignId)
      .populate('contactIds')
      .populate('emailTemplateId');

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const recipients = campaign.contactIds.map((c) => c.email);
    const subject = campaign.emailTemplateId.subject;
    const html = campaign.emailTemplateId.content;

    const sendTime = new Date(new Date(createdAt).getTime() + delayMinutes * 60000);

    await agenda.start();
    await agenda.schedule(sendTime, 'send-email', {
      to: recipients,
      subject,
      html,
    });

    res.status(200).json({ message: 'Email(s) scheduled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error scheduling email(s)' });
  }
};