export type Job = {
  jobTitleKr: string;
  jobTitleEn: string;
};

export async function getJobs() {
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`);
  const res = await jobs.json();

  return res.data;
}
