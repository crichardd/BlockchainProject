pragma solidity ^0.8.0;

contract DataStorage {
    struct DonneesUtilisateur {
        string nom;
        string prenom;
        string dateNaissance;
        string email;
        string telephone;
        string adresse;
        bool autorisationOwner;
        mapping(address => bool) autorisations;
    }

    mapping(address => DonneesUtilisateur) utilisateurs;
    mapping(address => address[]) authorizedAddresses;

    event NouvelUtilisateurEnregistre(address utilisateur);
    event AutorisationAccordee(address utilisateur, address autorisePar);
    event AutorisationRevoquee(address utilisateur, address revoquePar);

    function enregistrerUtilisateur(
        address _utilisateur,
        string memory _nom,
        string memory _prenom,
        string memory _dateNaissance,
        string memory _email,
        string memory _adresse,
        string memory _telephone
    ) public {
        utilisateurs[_utilisateur].nom = _nom;
        utilisateurs[_utilisateur].prenom = _prenom;
        utilisateurs[_utilisateur].dateNaissance = _dateNaissance;
        utilisateurs[_utilisateur].email = _email;
        utilisateurs[_utilisateur].adresse = _adresse;
        utilisateurs[_utilisateur].telephone = _telephone;
        utilisateurs[_utilisateur].autorisationOwner = true;

        emit NouvelUtilisateurEnregistre(_utilisateur);
    }

    function accorderAutorisation(
        address _utilisateur,
        address _autorisePar
    ) public {
        require(
            utilisateurs[_utilisateur].autorisationOwner,
            "Utilisateur non enregistre"
        );
        utilisateurs[_utilisateur].autorisations[_autorisePar] = true;
        authorizedAddresses[_utilisateur].push(_autorisePar);

        emit AutorisationAccordee(_utilisateur, _autorisePar);
    }

    function revoquerAutorisation(
        address _utilisateur,
        address _revoquePar
    ) public {
        require(
            utilisateurs[_utilisateur].autorisationOwner,
            "Utilisateur non enregistre"
        );
        utilisateurs[_utilisateur].autorisations[_revoquePar] = false;
        // Loop through the authorized addresses and find the one to remove
        for (uint256 i = 0; i < authorizedAddresses[_utilisateur].length; i++) {
            if (authorizedAddresses[_utilisateur][i] == _revoquePar) {
                // If found, remove the address by shifting the elements
                for (
                    uint256 j = i;
                    j < authorizedAddresses[_utilisateur].length - 1;
                    j++
                ) {
                    authorizedAddresses[_utilisateur][j] = authorizedAddresses[
                        _utilisateur
                    ][j + 1];
                }
                authorizedAddresses[_utilisateur].pop(); // Remove the last element
                break; // Exit the loop
            }
        }
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
            string memory adresse,
            string memory telephone
        )
    {
        require(
            utilisateurs[_utilisateur].autorisations[_demandeur],
            "Acces non autorise, vous n'avez pas autorisation"
        );

        return (
            utilisateurs[_utilisateur].nom,
            utilisateurs[_utilisateur].prenom,
            utilisateurs[_utilisateur].dateNaissance,
            utilisateurs[_utilisateur].email,
            utilisateurs[_utilisateur].adresse,
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
            string memory adresse,
            string memory telephone,
            bool autorisationOwner
        )
    {
        require(
            utilisateurs[_utilisateur].autorisationOwner,
            "Utilisateur non enregistre"
        );

        return getUserData(_utilisateur);
    }

    function getUserData(
        address _utilisateur
    )
        private
        view
        returns (
            string memory nom,
            string memory prenom,
            string memory dateNaissance,
            string memory email,
            string memory adresse,
            string memory telephone,
            bool autorisationOwner
        )
    {
        return (
            utilisateurs[_utilisateur].nom,
            utilisateurs[_utilisateur].prenom,
            utilisateurs[_utilisateur].dateNaissance,
            utilisateurs[_utilisateur].email,
            utilisateurs[_utilisateur].adresse,
            utilisateurs[_utilisateur].telephone,
            utilisateurs[_utilisateur].autorisationOwner
        );
    }

    function getAuthorizations(
        address _utilisateur
    ) public view returns (address[] memory listadd) {
        return authorizedAddresses[_utilisateur];
    }

    function getAccesAuthorisation(
        address _utilisateur,
        address _demandeur
    ) public view returns (bool acces) {
        return utilisateurs[_utilisateur].autorisations[_demandeur];
    }
}
