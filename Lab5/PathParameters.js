export default function PathParameters(app) {
  // Addition
  app.get('/lab5/add/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  // Subtraction
  app.get('/lab5/subtract/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.send(difference.toString());
  });

  // Multiplication
  app.get('/lab5/multiply/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });

  // Division
  app.get('/lab5/divide/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  });
}
