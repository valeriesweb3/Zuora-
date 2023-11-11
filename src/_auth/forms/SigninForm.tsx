import { useNavigate } from "react-router-dom";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";



import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


const SigninForm = () => {
  
  const navigate = useNavigate();

  const [connectedAddress, setConnectedAddress] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setConnectedAddress(accounts[0]);

        // Redirect to the home page after connecting the wallet
        navigate("/");
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkIfWalletIsConnected();
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('No ethereum object');
    }
  };


 



  return (
    <Form {...Form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/zuoralogo.png" alt="logo" />

        

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Get answers to questions 

        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
        from people you can trust.
        </p>

        {connectedAddress ? (
          <p>Connected Address: {connectedAddress}</p>
        ) : (
          <>
            <Button onClick={connectWallet} className="shad-button_primary">
              Connect Wallet
            </Button>
          </>
        )}
        
      </div>
    </Form>
  );
};

export default SigninForm;


/** 
 * 
  
<form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-green-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
 * 
*/