const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTg3MDg4NC0yMjM1LTQ0ZTgtYmQ2MS1lYjRiM2Y4YTU2MjIiLCJlbWFpbCI6InJzZGV2NzY0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzYzRhN2EyZDg0YTVkMTNmMWQ4YyIsInNjb3BlZEtleVNlY3JldCI6ImRhM2MzZDMwZGY1ZGI4NDZkYzU1OGJkODNkZDViODA0MWE3ZWI1NTU5NWZiYTEwMzA4NGI4M2ZkNTY0MDhhYjQiLCJpYXQiOjE2OTM1NjQ0MTN9.BqPkedA4zQBYNGOiZdI8ahQWzqHSeuJdR5yz5aH70GE'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "E:/api-pinata/download.jpeg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
      });
      formData.append('pinataMetadata', pinataMetadata);
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', pinataOptions);

      try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization': `Bearer ${JWT}`
          }
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
  }
  
  pinFileToIPFS()