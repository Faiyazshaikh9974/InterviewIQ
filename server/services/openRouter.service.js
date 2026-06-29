import axios from "axios";

export const askAI = async (messages) => {
  try {
    if (!messages || !isArray(messages) || messages.length === 0) {
      throw new Error("Message Array is empty");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: { model: "openai/gpt-4o-mini", messages: messages },
      },
    );

    console.log(response);
  } catch (error) {}
};
