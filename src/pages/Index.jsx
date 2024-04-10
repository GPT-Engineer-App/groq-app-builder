import { useState } from "react";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

const API_URL = "https://your-groq-api.com"; // TODO: Replace with your Groq API URL

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleQuestionChange = (e) => setCurrentQuestion(e.target.value);

  const addQuestion = () => {
    if (currentQuestion) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion("");
    }
  };

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const generateApp = async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, questions, answers }),
    });
    const data = await response.json();
    setResult(data.app);
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        App Builder
      </Heading>

      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter your app prompt" value={prompt} onChange={handlePromptChange} />

        <VStack spacing={2} align="stretch">
          {questions.map((q, i) => (
            <Input key={i} placeholder={`Answer for: ${q}`} value={answers[i] || ""} onChange={(e) => handleAnswerChange(e, i)} />
          ))}
        </VStack>

        <Input placeholder="Enter a question" value={currentQuestion} onChange={handleQuestionChange} />
        <Button leftIcon={<FaPlus />} onClick={addQuestion}>
          Add Question
        </Button>

        <Button leftIcon={<FaSearch />} onClick={generateApp} disabled={!prompt || questions.length === 0}>
          Generate App
        </Button>
      </VStack>

      {result && (
        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>
            Generated App
          </Heading>
          <Text whiteSpace="pre-wrap">{result}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
