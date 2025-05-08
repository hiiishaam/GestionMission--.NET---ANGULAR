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

        public static List<Model.OrdreMissionDetails> ConvertList(List<OrdreMissionDetails> sourceList)
        {
            return sourceList.Select(s => new Model.OrdreMissionDetails
            {
                Le = string.IsNullOrWhiteSpace(s.LE) ? string.Empty : s.LE,
                NomPrenom = string.IsNullOrWhiteSpace(s.NOM_PRENOM) ? string.Empty : s.NOM_PRENOM,
                Fonction = string.IsNullOrWhiteSpace(s.FONCTION) ? string.Empty : s.FONCTION,
                Affectation = string.IsNullOrWhiteSpace(s.AFFECTATION) ? string.Empty : s.AFFECTATION,
                Destination = string.IsNullOrWhiteSpace(s.DESTINATION) ? string.Empty : s.DESTINATION,
                MotifDeplacement = string.IsNullOrWhiteSpace(s.MOTIF_DEPLACEMENT) ? string.Empty : s.MOTIF_DEPLACEMENT,
                MoyenDeTransport = string.IsNullOrWhiteSpace(s.MOYEN_DE_TRANSPORT) ? string.Empty : s.MOYEN_DE_TRANSPORT,
                Accompagnateurs = string.IsNullOrWhiteSpace(s.ACCOMPAGNATEURS) ? string.Empty : s.ACCOMPAGNATEURS,
                DateDepart = string.IsNullOrWhiteSpace(s.DATE_DEPART) ? string.Empty : s.DATE_DEPART,
                HeureDepart = string.IsNullOrWhiteSpace(s.HEURE_DEPART) ? string.Empty : s.HEURE_DEPART,
                DateArrivee = string.IsNullOrWhiteSpace(s.DATE_ARRIVEE) ? string.Empty : s.DATE_ARRIVEE,
                HeureArrivee = string.IsNullOrWhiteSpace(s.HEURE_ARRIVEE) ? string.Empty : s.HEURE_ARRIVEE
            }).ToList();
        }
    }
}
