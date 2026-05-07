// Set GitHub repository secrets using the GitHub API
import nacl from 'tweetnacl';
import pkg from 'tweetnacl-util';
import pkg2 from 'tweetnacl-sealedbox-js';
const { seal } = pkg2;
const { decodeBase64, encodeBase64 } = pkg;

const GH_TOKEN = process.argv[2];
const REPO = 'czfxwq-dot/wu-personal-site';

async function getPublicKey(token, repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}/actions/secrets/public-key`, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return res.json();
}

async function setSecret(token, repo, keyId, keyB64, name, value) {
  const publicKeyBytes = decodeBase64(keyB64);
  const messageBytes = Buffer.from(value);
  const encrypted = seal(messageBytes, publicKeyBytes);
  const encryptedBase64 = encodeBase64(encrypted);

  const res = await fetch(`https://api.github.com/repos/${repo}/actions/secrets/${name}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ encrypted_value: encryptedBase64, key_id: keyId }),
  });

  if (res.ok) {
    console.log(`${name}: ✅ set`);
  } else {
    const data = await res.json();
    console.log(`${name}: ❌ ${data.message || res.status}`);
  }
}

async function main() {
  const args = process.argv.slice(3);
  const pairs = [];
  for (let i = 0; i < args.length; i += 2) {
    pairs.push([args[i], args[i + 1]]);
  }

  if (pairs.length === 0) {
    console.log('Usage: node set-gh-secrets.mjs TOKEN NAME VALUE [NAME2 VALUE2 ...]');
    process.exit(1);
  }

  const pubKey = await getPublicKey(GH_TOKEN, REPO);
  console.log(`Public key: ${pubKey.key_id}`);

  for (const [name, value] of pairs) {
    await setSecret(GH_TOKEN, REPO, pubKey.key_id, pubKey.key, name, value);
  }
}

main();
