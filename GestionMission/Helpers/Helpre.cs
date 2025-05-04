using GestionMission.Entities;

namespace GestionMission.Helpers
{
    public class Helpre
    {
        public static (List<Team> inBoth, List<Team> onlyInFirst, List<Team> onlyInSecond) CompareLists(List<Team> firstList, List<Team> secondList)
        {
            firstList ??= new List<Team>();
            secondList ??= new List<Team>();

            var inBoth = firstList.Where(f => secondList.Any(s => s.EmployeeId == f.EmployeeId)).ToList();
            var onlyInFirst = firstList.Where(f => !secondList.Any(s => s.EmployeeId == f.EmployeeId)).ToList();
            var onlyInSecond = secondList.Where(s => !firstList.Any(f => f.EmployeeId == s.EmployeeId)).ToList();

            return (inBoth, onlyInFirst, onlyInSecond);
        }

    }
}
