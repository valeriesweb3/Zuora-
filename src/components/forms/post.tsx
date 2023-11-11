
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, Button, Textarea } from '@/components/ui';
import { PostValidation } from '@/lib/validation';
import { useState } from 'react';
import { ethers } from 'ethers';
import postsabi from '../../contracts/posts.json';

const contractAddress = '0x0a23E002358F591C928af6f0001108002aeb2611'; // Replace with your contract address
const contractABI = postsabi; // Replace with your contract ABI

const PostForm = () => {
    
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: '', // Assuming your PostValidation schema has a 'caption' field
    },
  });

  const [newCid, setNewCid] = useState('');
  const [posts, setPosts] = useState([]);

  const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider?.getSigner();
  const contract = signer ? new ethers.Contract(contractAddress, contractABI, signer) : null;

  const createPost = async () => {
    try {
      if (!contract) {
        console.error('Contract not initialized');
        return;
      }

      const tx = await contract.createPost(newCid);
      await tx.wait();

      // Update the posts list
      const updatedPost = await contract.getPost(posts.length + 1);
      setPosts([...posts, updatedPost]);
      setNewCid('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { caption } = formData;
      // Assuming you want to convert 'caption' to JSON and post it to IPFS
      const postJSON = JSON.stringify({ caption });
      const cid = await postJSONToIPFS(postJSON);
      setNewCid(cid);

      // Now, you can create the post on the Ethereum blockchain
      await createPost();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form control={control} onSubmit={handleSubmit(handleFormSubmit)}>
      <form className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
