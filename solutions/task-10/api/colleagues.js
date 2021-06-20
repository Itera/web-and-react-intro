export async function getColleagues() {
  const res = await fetch("http://localhost:4000/colleagues");
  const colleagues = await res.json();
  return colleagues.map(mapFromDto);
}

export function addColleague(colleague) {
  return fetch("http://localhost:4000/colleagues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapToDto(colleague)),
  });
}

export function deleteColleague(colleague) {
  return fetch(`http://localhost:4000/colleagues/${colleague.Id}`, {
    method: "DELETE",
  });
}

export function updateColleague(colleague) {
  return fetch(`http://localhost:4000/colleagues/${colleague.Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapToDto(colleague)),
  });
}

function mapFromDto({ id, name, background, homeTown }) {
  return {
    Id: id,
    Name: name,
    Background: background,
    "Home Town": homeTown,
  };
}

function mapToDto(colleague) {
  return {
    id: colleague.Id,
    name: colleague.Name,
    background: colleague.Background,
    homeTown: colleague["Home Town"],
  };
}
