using System;

class Polygon
{
    private Point CenterCoords;
    private double Radius;
    private List<Point> Vertices;

    public String Name;
    public int VerticesNumber;

    private void calculateVertices()
    {
        double angle;

        angle = 2 * Math.PI / this.VerticesNumber;

        var newVertices = new List<Point>();

        for (int i = 0; i < this.VerticesNumber; ++i)
        {
            double x = CenterCoords.X + Radius * Math.Cos(i * angle);
            double y = CenterCoords.Y + Radius * Math.Sin(i * angle);

            newVertices.Add(new Point(x, y));
        }

        this.Vertices = newVertices;
    }

    Polygon(string name, int vertexNumber = 0)
    {
        this.Name = name;
        this.VerticesNumber = vertexNumber;
    }

    public void SetCoords(int x, int y)
    {
        this.CenterCoords = new Point(x, y);
    }

    public void SetRadius(double radius)
    {
        this.Radius = radius;
    }

    public void draw()
    {
        calculateVertices();

        // TODO: here put code to Vertices points based on Vertices list

        List<String> pointStrings = this.Vertices.Select(p => $"{p.X},{p.Y}").ToList();

        Console.WriteLine("I draw a {NameOfTheShape} with points" + string.Join("; ",pointStrings), this.Name);
        
    }
}