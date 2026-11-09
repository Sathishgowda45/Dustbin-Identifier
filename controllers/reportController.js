import Report from "../models/Report.js";
import Dustbin from "../models/Dustbin.js";

export const createReport = async (req, res) => {
  try {
    const { dustbinId, message } = req.body;

    const report = await Report.create({
      dustbinId,
      message
    });

    await Dustbin.findByIdAndUpdate(
      dustbinId,
      { status: "Full" }
    );

    res.status(201).json({
      message: "Report sent successfully",
      report
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("dustbinId");

    res.status(200).json(reports);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};