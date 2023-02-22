using System.Security.Cryptography.X509Certificates;

namespace polycalc
{
    class Polygon
    {
        private PointD CenterCoords;
        private double Radius;
        private List<PointD> Vertices;

        public String Name;
        public int VerticesNumber;

        public Polygon(string name, int vertexNumber = 0, double x = 0, double y = 0, double radius = 1)
        {
            this.Name = name;
            this.VerticesNumber = vertexNumber;
            this.SetCoords(x, y);
            this.Radius = radius;
        }

        private void calculateVertices()
        {
            double angle;

            angle = 2 * Math.PI / this.VerticesNumber;

            var newVertices = new List<PointD>();

            for (int i = 0; i < this.VerticesNumber; ++i)
            {
                double x = CenterCoords.X + Radius * Math.Cos(i * angle);
                double y = CenterCoords.Y + Radius * Math.Sin(i * angle);

                newVertices.Add(new PointD(x, y));
            }

            this.Vertices = newVertices;
        }

        public void SetCoords(double x, double y)
        {
            this.CenterCoords = new PointD(x, y);
        }

        public void SetRadius(double radius)
        {
            this.Radius = radius;
        }

        public void draw()
        {
            calculateVertices();

            List<String> pointStrings = this.Vertices.Select(p => $"{p.X.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)},{p.Y.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}").ToList();

            Console.WriteLine($"I draw a {Name} with points {String.Join("; ", pointStrings)}");

        }
    }
}