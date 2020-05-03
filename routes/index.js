const express = require("express"),
  router = express.Router(),
  Station = require("../models/stations");

// POST
router.post("/station/create", async (req, res) => {
  const { name, address, phone, province } = req.body; // => const name = req.body.name
  await Station.findOne({ name })
    .then((station) => {
      if (station) {
        Promise.reject({ messenger: "Station is already exist" });
      }
      const newStation = new Station({
        name, // => name : req.body.name
        province,
        phone,
        address,
      });
      newStation.save();
      return res.status(200).json({ station: newStation });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// GET ALL
router.get("/stations", async (req, res) => {
  await Station.find()
    .then((stations) => {
      return res.status(200).json({ stations: stations });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// GET ALL
router.get("/station/:id", async (req, res) => {
  const { id } = req.params; // => id : lấy id
  await Station.findById(id)
    .then((station) => {
      return res.status(200).json({ station: station });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// PUT - UPDATE
router.put("/station/:id", async (req, res) => {
  const { id } = req.params; // => id : lấy id
  const { name, address, phone, province } = req.body; // => const name = req.body.name
  await Station.findById(id)
    .then((station) => {
      if (!station) {
        Promise.reject({ messenger: "Station does not exist!" });
      }
      const data = {
        name,
        address,
        province,
        phone,
      };
      Station.findByIdAndUpdate(id, data, (err) => {
        if (err) {
          Promise.reject({ messenger: err });
        }
        return res.status(200).json({ stationUpdate: data });
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

// DELETE ALL
router.delete("/stations/", async (req, res) => {
    await Station.deleteMany()
      .then(() => {
        return res
          .status(200)
          .json({
            messenger: "Delete successfuly!",
          });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  });

//DELETE ID 
router.delete("/station/:id", async (req, res) => {
    const { id } = req.params; // => id : lấy id
    await Station.findById(id)
      .then((station) => {
        if (!station) {
          Promise.reject({ messenger: "Station does not exist!" });
        }
        station.deleteOne();
        return res.status(200).json({messenger: "Delete successfuly!"})
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
});

module.exports = router;
