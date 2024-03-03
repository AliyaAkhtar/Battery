  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 5000;
  const cors = require('cors');
  const fs = require('fs'); // Import the fs module to read files

  app.use(cors());


  app.get('/api/battery/:id', (req, res) => {
    const batteryId = req.params.id;
    const batteryData = JSON.parse(fs.readFileSync('batteryData.json')); // Read the JSON file
    const battery = batteryData[batteryId];
    
    if (!battery) {
      return res.status(404).json({ error: 'Battery not found' });
    }

    // Disable caching for this API endpoint
    res.setHeader('Cache-Control', 'no-store');
  // console.log(battery)
    return res.json(battery);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
