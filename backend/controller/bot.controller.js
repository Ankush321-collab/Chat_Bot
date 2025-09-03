import express from 'express';
import train from '../questions.json' with { type: 'json' };
import User from '../model/user.model.js';
import Bot from '../model/bot.model.js';

const message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty!"
      });
    }

    // Save user message
    const user = await User.create({
      sender: "user",
      text: text
    });

    // Normalize user input
    const userQuestion = text.toLowerCase().trim();

    // Lookup response from training data
    const botAnswer = train[userQuestion] || "I don't understand that question. Please try asking something else.";

    // Save bot response
    const bot = await Bot.create({
      text: botAnswer
    });

    return res.status(200).json({
      success: true,
      user: {
        text: user.text,
        timestamp: user.timestamp
      },
      bot: {
        text: bot.text,
        timestamp: bot.timestamp
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error processing message",
      error: error.message
    });
  }
};

export default message;
