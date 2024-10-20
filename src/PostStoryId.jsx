import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function PostStoryId({ onStorySubmit }) {
  const [storyId, setStoryId] = useState("");
  const [error, setError] = useState(null);
//   const url = "https://run.mocky.io/v3/b00954cf-49fe-456f-8d05-412b1a723fe5" ;
  const url = "https://run.mocky.io/v3/21e3fdef-2ffc-4553-8d33-b64e112ac42b";
  const handleInputChange = (e) => {
    setStoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      // Fetch data from the server using the storyId
      const response = await fetch(`${url}/${storyId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API response data:", data);
      onStorySubmit(data);
    } catch (err) {
      console.error("API fetch error:", err);
      setError("Failed to fetch data. Please check the story ID or try again later.");
    }
  };

  return (
    <div>
      <Card className="m-5 bg-gradient-to-l from-[#a8ff78] to-[#78ffd6]  shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <Label htmlFor="storyid">Story ID:</Label>
            <Input
              className="border border-black"
              id="storyid"
              type="text"
              value={storyId}
              onChange={handleInputChange}
              required
            />
            <Button className="w-1/2 mx-auto" type="submit">SUBMIT</Button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default PostStoryId;