const KnowledgeCutOFFOpenAI = "Knowledge cutoff: 2023-10"
const KnowledgeCutOFFMeta = "Knowledge cutoff: 2023-12"
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
}
const currentDate = `Current date: ${new Date().toLocaleDateString("en-US", options)}`

const llmConfig = {
  openrouter: {
    url: `https://openrouter.ai/api/v1/chat/completions`,
    providerRouting: {
      order: [`${process.env.OPENROUTER_FIRST_PROVIDER}`]
    },
    apiKey: process.env.OPENROUTER_API_KEY
  },
  together: {
    url: `https://api.together.xyz/v1/chat/completions`,
    apiKey: process.env.TOGETHER_API_KEY
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  },
  pinecone: {
    apiKey: process.env.SECRET_PINECONE_API_KEY || "defaultApiKey",
    index: process.env.SECRET_PINECONE_INDEX || "defaultIndex",
    projectId: process.env.SECRET_PINECONE_PROJECT_ID || "defaultProjectId",
    environment:
      process.env.SECRET_PINECONE_ENVIRONMENT || "defaultEnvironment",
    namespace: process.env.SECRET_PINECONE_NAMESPACE,
    temperature: 0.4,
    messageLength: {
      min: parseInt(process.env.MIN_LAST_MESSAGE_LENGTH || "25", 10),
      max: parseInt(process.env.MAX_LAST_MESSAGE_LENGTH || "1000", 10)
    }
  },
  cohere: {
    rerank: (process.env.USE_COHERE_RERANK || "false").toLowerCase() == "true",
    apiKey: process.env.SECRET_COHERE_API_KEY || "defaultApiKey"
  },
  systemPrompts: {
    hackerGPT: `${process.env.SECRET_HACKERGPT_SYSTEM_PROMPT}\n${KnowledgeCutOFFMeta}\n${currentDate}`,
    hackerGPTCurrentDateOnly: `${process.env.SECRET_HACKERGPT_SYSTEM_PROMPT}\n${currentDate}`,
    openai: `${process.env.SECRET_OPENAI_SYSTEM_PROMPT}\n${KnowledgeCutOFFOpenAI}\n${currentDate}`,
    openaiCurrentDateOnly: `${process.env.SECRET_OPENAI_SYSTEM_PROMPT}\n${currentDate}`,
    pinecone: `${process.env.SECRET_HACKERGPT_SYSTEM_PROMPT} ${process.env.PINECONE_SYSTEM_PROMPT}\n${currentDate}`
  },
  models: {
    hackerGPT_default_openrouter:
      process.env.OPENROUTER_HACKERGPT_DEFUALT_MODEL,
    hackerGPT_default_together: process.env.TOGETHER_HACKERGPT_DEFAULT_MODEL,
    hackerGPT_RAG_openrouter: process.env.OPENROUTER_HACKERGPT_RAG_MODEL,
    hackerGPT_RAG_together: process.env.TOGETHER_HACKERGPT_RAG_MODEL,
    hackerGPT_standalone_question_openrouter:
      process.env.OPENROUTER_STANDALONE_QUESTION_MODEL,
    hackerGPT_standalone_question_together:
      process.env.TOGETHER_STANDALONE_QUESTION_MODEL,
    hackerGPT_pro_openrouter: process.env.OPENROUTER_HACKERGPT_PRO_MODEL,
    hackerGPT_pro_together: process.env.TOGETHER_HACKERGPT_PRO_MODEL
  },
  usePinecone: (process.env.USE_PINECONE?.toLowerCase() || "false") === "true",
  useOpenRouter:
    (process.env.USE_OPENROUTER?.toLowerCase() || "true") === "true"
}

export default llmConfig
