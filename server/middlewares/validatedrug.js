function validateDrug(req, res, next) {
  const { name, dosage, card, pack, perDay } = req.body;
  // change type of card, pack, perDay should be number
  req.body.card = Number(card);
  req.body.pack = Number(pack);
  req.body.perDay = Number(perDay);

  console.log("Validating drug:", req.body);
  // 1. Name length > 5
  if (!name || name.length <= 5) {
    console.log(name);
    return res.status(400).json({ error: "Name must be longer than 5 characters" });
  }

  // 2. Dosage format: "XX-morning,XX-afternoon,XX-night"
  // - XX: 1 hoặc 2 chữ số
  // - morning/afternoon/night cố định
  const dosageRegex = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
  if (!dosageRegex.test(dosage)) {
    return res.status(400).json({ 
      error: "Dosage format invalid. Expected format: 'XX-morning,XX-afternoon,XX-night' (X = digit)" 
    });
  }

  // 3. Card > 1000
  if (typeof card !== "number" || card <= 1000) {
    console.log(card);
    return res.status(400).json({ error: "Card must be greater than 1000" });
  }

  // 4. Pack > 0
  if (typeof pack !== "number" || pack <= 0) {
    return res.status(400).json({ error: "Pack must be greater than 0" });
  }

  // 5. perDay > 0 and < 90
  if (typeof perDay !== "number" || perDay <= 0 || perDay >= 90) {
    return res.status(400).json({ error: "PerDay must be greater than 0 and less than 90" });
  }

  // Nếu qua được tất cả check thì cho tiếp tục
  next();
}

module.exports = validateDrug;
