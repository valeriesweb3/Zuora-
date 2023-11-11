import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage, Button, Textarea } from '@/components/ui';
import { FormControl } from "@/components/ui/form"; // Adjust the import path based on your project structure

import { PostValidation } from '@/lib/validation';
import { useState } from 'react';
import { ethers } from 'ethers';
import postsabi from '../../contracts/posts.json';

const contractAddress = '0x0a23E002358F591C928af6f0001108002aeb2611'; // Replace with your contract address
const contractABI = postsabi; // Replace with your contract ABI
const PostForm = () => {
  const form = useForm<z.infer<typeof PostValidation>>({
     resolver: zodResolver(PostValidation),
  });

  const [newCid, setNewCid] = useState('');
  const [posts, setPosts] = useState([]);

  const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider?.getSigner();
  const contract = signer ? new ethers.Contract(contractAddress, contractABI, signer) : null;

  const handleSubmit = async () => {
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

  return (
     <Form {...form}>
        <form className="flex flex-col gap-9 w-full max-w-5xl">
           <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                 <FormItem>
                    <FormLabel className="shad-form_label">Question</FormLabel>
                    <FormControl>
                       <Textarea
                          className="shad-textarea custom-scrollbar"
                          {...field}
                       />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                 </FormItem>
              )}
           />

           <div className="flex gap-4 items-center justify-end">
              <Button
                 type="button"
                 className="shad-button_primary whitespace-nowrap"
                 onClick={() => handleSubmit()}
              >
                 Post
              </Button>
           </div>
        </form>
     </Form>
  );
};

export default PostForm;


