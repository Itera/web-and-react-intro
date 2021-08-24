export async function getColleagues() {
  const res = await fetch("http://localhost:4000/colleagues");
  const colleagues = await res.json();
  return colleagues;
}

export function addColleague(colleague) {
  return fetch("http://localhost:4000/colleagues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(colleague),
  });
}

export function deleteColleague(colleague) {
  return fetch(`http://localhost:4000/colleagues/${colleague.id}`, {
    method: "DELETE",
  });
}

export function updateColleague(colleague) {
  return fetch(`http://localhost:4000/colleagues/${colleague.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(colleague),
  });
}
