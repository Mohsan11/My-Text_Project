const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// async function generateResponse(message) {
//   const response = await openai.Completion.create({
//     engine: "text-davinci-002",
//     prompt: message,
//     temperature: 0.5,
//   });
//   return response.choices[0].text;
// }

const openai = new OpenAIApi(configuration);
const textGeneration = async (req, res) => {
  try {
    const { text, cmd } = req.body;
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: text,
      instruction: cmd,
    });
    const data = response.data;
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Error: ", error);
  }
};

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "This image can not be generated",
    });
  }
};

module.exports = {
  textGeneration,
  generateImage,
};
