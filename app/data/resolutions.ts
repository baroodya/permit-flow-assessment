export interface ResolutionType {
  id: number;
  resolution: string;
  notes: string[];
};

export const resolutions = [
  {
    "id": 0,
    "resolution": "No Permit Required",
    "notes": ["Nothing is required! You’re set to build."],
  },
  {
    "id": 1,
    "resolution": "In-House Review Process",
    "notes": [
      "A building permit is required.",
      "Include plan sets.",
      "Submit application for in-house review."],
  },
  {
    "id": 2,
    "resolution": "Over-the-Counter Submission Process",
    "notes": [
      "A building permit is required.",
      "Submit application for OTC review."],
  }
];

export const getResolution = (answers: Record<number, String[]>) => {
  if (answers[1]) {
    if (answers[1].includes('Bathroom remodel') && answers[1].length == 1) {
      return resolutions[2];
    } else {
      return resolutions[1];
    }
  }
  if (answers[2]) {
    if (answers[2].includes('Other')) {
      return resolutions[1];
    }
    if (answers[2].includes('Garage door replacement') && answers[2].includes('Exterior doors')) {
      return resolutions[2];
    }
  }
  return resolutions[0];
};