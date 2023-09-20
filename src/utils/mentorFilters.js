import { orderBy } from "lodash";

export function applyFilter(mentors, filters) {
  const { sortBy, company, position, city, searchQuery } = filters;
  let filteredMentors = [...mentors];

  if (sortBy) {
    filteredMentors = sortMentors(filteredMentors, sortBy);
  }

  if (company) {
    filteredMentors = filterByCompany(filteredMentors, company);
  }

  if (position) {
    filteredMentors = filterByPosition(filteredMentors, position);
  }

  if (city) {
    filteredMentors = filterByCity(filteredMentors, city);
  }

  if (searchQuery) {
    filteredMentors = filterBySearchQuery(filteredMentors, searchQuery);
  }
  
  return filteredMentors;
}

export function sortMentors(mentors, sortBy) {
  if (sortBy === "reviewDesc") {
    return orderBy(mentors, ["reviewAverageRating"], ["desc"]);
  }
  if (sortBy === "sessionDesc") {
    return orderBy(mentors, ["sessionCount"], ["desc"]);
  }
  if (sortBy === "newest") {
    return orderBy(mentors, ["createdAt"], ["desc"]);
  }
}

export function filterByCompany(mentors, company) {
  if (company.length === 0) return mentors;
  return mentors.filter((mentor) => mentor.currentCompany === company);
}

export function filterByPosition(mentors, position) {
  if (position.length === 0) return mentors;
  return mentors.filter((mentor) => mentor.currentPosition === position);
}

export function filterByCity(mentors, city) {
  if (city.length === 0) return mentors;
  return mentors.filter((mentor) => mentor.city === city);
}

export function filterBySearchQuery(mentors, searchQuery) {
  if (!searchQuery) return mentors;
  return mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
