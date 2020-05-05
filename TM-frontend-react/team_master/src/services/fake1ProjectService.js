export const projects = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "Design Project",
    description: "This is a sample description",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "SL Inspire",
    description: "This is a sample description",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "IEEE Techno",
    description: "This is a sample description",
  },
];

export function getProjects() {
  return projects.filter((g) => g);
}
