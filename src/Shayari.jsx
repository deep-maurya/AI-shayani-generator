import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Container,
  SimpleGrid,
  Flex,
  Text,
  Stack,
  StackDivider,
  Alert,
  AlertIcon,
  Input,
  Button,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

function Shayari() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingerror, setLoadingerror] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      setLoadingerror(false)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(`Imagine you are a too good in shayari in Hindi so every time I'll give you a keyword according to that you have to write shayari using all the keywords and don't use any bad words. here i am giving some keywords now create the shayari so the keywords are ${inputValue}`);
      setInputValue('');
      const response = result.response;
      const text = await response.text();
      console.log(text);
      setPromptResponses([text, ...promptResponses]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
      setLoading(false);
      setLoadingerror(true)
    }
  };

  return (
    <Container maxW={'5xl'} py={12}>
      <Text
        textTransform={'uppercase'}
        color={'blue.400'}
        fontWeight={600}
        fontSize={'sm'}
        textAlign={'center'}
        bg={useColorModeValue('blue.50', 'blue.900')}
        p={5}
        alignSelf={'flex-start'}
        rounded={'md'}>
        Shayari Generate using Geminiai
      </Text>
      <SimpleGrid mb={10} columns={{ base: 1, md: 1 }} mt={10} spacing={10}>
        <Flex gap={2} flexDirection={'row'} textAlign={'center'} ml={'auto'} mr={'auto'}>
          <Input
            type="text"
            size={'lg'}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="enter keyword for shayari"
          />
          <Button onClick={getResponseForGivenPrompt} colorScheme='teal' pl={10} pr={10} size='lg' type="submit">Generate</Button>
        </Flex>
      </SimpleGrid>
    
      {loading && (
        <Alert textAlign={'center'} status="info">
          <AlertIcon />
          Loading
        </Alert>
      )}
      {loadingerror && (
        <Alert textAlign={'center'} status="error">
          <AlertIcon />
          Something went  wrong try again
        </Alert>
      )}
        {promptResponses.map((promptResponse, index) => (
          <Box textAlign={'center'}  key={index} style={{ whiteSpace: 'pre-wrap',borderBottom:"1px solid gray",padding:"10px" }}>
            <Box fontWeight={`${index === 0 ? '700' : ''}`} dangerouslySetInnerHTML={{ __html: promptResponse.replace(/\n/g, '<br />') }}></Box>
          </Box>
        ))}
    </Container>
  );
}

export default Shayari;
