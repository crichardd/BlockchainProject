pragma solidity >=0.8.13 <0.9.0;
/*
import "fhevm/abstracts/EIP712WithModifier.sol";
import "fhevm/lib/TFHE.sol";

contract ConfidentialDID is EIP712WithModifier {
    bytes32 private DOMAIN_SEPARATOR;
    address public trustedAgent;
    mapping(address => euint16) internal creditScores;
    
    constructor(address _trustedAgent) EIP712WithModifier("Authorization token", "1") {
        trustedAgent = _trustedAgent;
    }

    // Only a third party trusted agent should store user credit scores
    modifier onlyAgent {
        require(msg.sender == trustedAgent);
        _;
    }

    function store(address user, bytes calldata encryptedCreditScore) external onlyAgent {
        creditScores[user] = TFHE.asEuint16(encryptedCreditScore);
    }

    // External parties and smart contracts can verify that a user address has a score above 700 without knowing the actual score
    function isUserScoreAbove700(address user) external view returns (bool) {
        require(TFHE.isInitialized(creditScores[user]), "Credit score not set");
        ebool isAbove700Encrypted = TFHE.gt(creditScores[user], TFHE.asEuint8(700));
        return TFHE.decrypt(isAbove700Encrypted);
    }

    // EIP 712 signature is required to prove that the user is requesting to view his/her own credit score
    // Credit score is decrypted then re-encrypted using a publicKey provided by the user client to make sure that RPC cannot peek. 
    // The user can decrypt their credit score with the respective privateKey (stored on client)
    function viewOwnScore(bytes32 publicKey, bytes calldata signature) public view onlySignedPublicKey(publicKey, signature) returns (bytes memory) {
        return TFHE.reencrypt(creditScores[msg.sender], publicKey, 0);
    }
}
*/