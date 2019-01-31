using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace TriggerAJob
{
    class Program
    {
        private static Timer timer;

        static void Main(string[] args)
        {
            // Set the time(5 mins in this case)
            timer = new Timer(TimeSpan.FromSeconds(5).TotalMilliseconds);
            timer.Elapsed += new ElapsedEventHandler(your_method); ;
            timer.Start();
            Console.WriteLine("Job Running...");

            //One way to do it - Busy Waiting - UGLY
            while (true) ;
        }

        private static void your_method(object sender, ElapsedEventArgs e)
        {
            Console.WriteLine("Running..");
        }
    }
}
