"use client"
import React, { useState } from "react";
import {useRouter, useSearchParams } from "next/navigation"

const InputComponent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultSearchQuery = searchParams.get('search') ?? ""
 
    function onsubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search');
    
        if (searchQuery === "") {
          // If the search query is empty, navigate back to the default URL
          router.replace("/");
        } else {
          // If there is a search query, update the URL with the search parameter
          router.replace(`/?search=${searchQuery}`);
        }
        // router.replace(`/?search=${searchQuery}`)
      }
      

  return (
    <form action="" onSubmit={onsubmit} >
          <input
            type="text"
            id="search"
            name="search"
            className="flex  w-full rounded-md border border-input bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 lg:w-[300px]  text-xl text-center "
            placeholder="search by brands or categories"
            defaultValue={defaultSearchQuery}
            autoComplete="off"
          />
        </form>
  );
};

export default InputComponent;
