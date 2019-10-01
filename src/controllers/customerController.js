const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer", (err, customers) => {
      if (err) {
        res.json(err);
        // ver tratamiento de errores con next
      }
      res.render("customers", {
        data: customers
      });
    });
  });
};

controller.save = (req, res) => {
  req.getConnection((err, conn) => {
    console.log(req.body);
    //    res.send("works");
    const data = req.body;
    conn.query("INSERT INTO customer set ?", [data], (err, customer) => {
      console.log(err);
      res.redirect("/");
    });
  });
};

controller.delete = (req, res) => {
  req.getConnection((err, conn) => {
    const { id } = req.params;
    conn.query("DELETE FROM customer WHERE id = ?", [id], (err, rows) => {
      res.redirect("/");
    });
  });
};

controller.update = (req, res) => {
  req.getConnection((err, conn) => {
    const { id } = req.params;
    conn.query(
      "SELECT * FROM customer  WHERE id = ?",
      [id],
      (err, customer) => {
        res.render("customer_edit", {
          data: customer[0]
        });
      }
    );
  });
};

controller.upd = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE customer set ? WHERE id = ?",
      [newCustomer, id],
      (err, rows) => {
        res.redirect("/");
      }
    );
  });
};

module.exports = controller;
