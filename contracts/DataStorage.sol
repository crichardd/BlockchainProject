pragma solidity ^0.8.0;

contract DataStorage {
    struct DonneesUtilisateur {
        string nom;
        string prenom;
        string dateNaissance;
        string email;
        string telephone;
        mapping(address => bool) autorisations;
    }

    mapping(address => DonneesUtilisateur) utilisateurs;

    event NouvelUtilisateurEnregistre(address utilisateur);
    event AutorisationAccordee(address utilisateur, address autorisePar);
    event AutorisationRevoquee(address utilisateur, address revoquePar);

    function enregistrerUtilisateur(
        address _utilisateur,
        string memory _nom,
        string memory _prenom,
        string memory _dateNaissance,
        string memory _email,
        string memory _telephone
    ) public {
        utilisateurs[_utilisateur].nom = _nom;
        utilisateurs[_utilisateur].prenom = _prenom;
        utilisateurs[_utilisateur].dateNaissance = _dateNaissance;
        utilisateurs[_utilisateur].email = _email;
        utilisateurs[_utilisateur].telephone = _telephone;

        emit NouvelUtilisateurEnregistre(_utilisateur);
    }

    function accorderAutorisation(
        address _utilisateur,
        address _autorisePar
    ) public {
        utilisateurs[_utilisateur].autorisations[_autorisePar] = true;
        emit AutorisationAccordee(_utilisateur, _autorisePar);
    }

    function revoquerAutorisation(
        address _utilisateur,
        address _revoquePar
    ) public {
        utilisateurs[_utilisateur].autorisations[_revoquePar] = false;
        emit AutorisationRevoquee(_utilisateur, _revoquePar);
    }

    function recupererDonneesAutorisees(
        address _utilisateur,
        address _demandeur
    )
        public
        view
        returns (
            string memory nom,
            string memory prenom,
            string memory dateNaissance,
            string memory email,
            string memory telephone
        )
    {
        require(
            utilisateurs[_utilisateur].autorisations[_demandeur],
            "Acces non autorise"
        );

        return (
            utilisateurs[_utilisateur].nom,
            utilisateurs[_utilisateur].prenom,
            utilisateurs[_utilisateur].dateNaissance,
            utilisateurs[_utilisateur].email,
            utilisateurs[_utilisateur].telephone
        );
    }

    function recupererOwnerDonneeUtilisateur(
        address _utilisateur
    )
        public
        view
        returns (
            string memory nom,
            string memory prenom,
            string memory dateNaissance,
            string memory email,
            string memory telephone
        )
    {
        require(msg.sender == _utilisateur, "Acces non autorise");

        return (
            utilisateurs[_utilisateur].nom,
            utilisateurs[_utilisateur].prenom,
            utilisateurs[_utilisateur].dateNaissance,
            utilisateurs[_utilisateur].email,
            utilisateurs[_utilisateur].telephone
        );
    }
}
