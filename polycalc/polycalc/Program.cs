namespace polycalc
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Polygon> polygons = new List<Polygon> {
                new Polygon("Nothing", 0),
                new Polygon("Point", 1),
                new Polygon("Line", 2,6,6,2),
                new Polygon("Triangle", 3),
                new Polygon("Quadrilateral", 4),
                new Polygon("Pentagon", 5),
                new Polygon("Hexagon", 6),
                new Polygon("Octagon", 8),
            };

            foreach(Polygon polygon in polygons)
            {
                polygon.draw();
            }
        }
    }

}