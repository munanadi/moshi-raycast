import { Detail } from "@raycast/api";

const Command = () => {
  /* 
 1. Load the image from the API
 2. Show loading spinner
 3. Display the image
 */

  return (
    <Detail
      markdown={`<img alt="heatmap" height="345" src="/Users/aadhi/Desktop/chart.jpg">`}
    />
  );
};

export default Command;
