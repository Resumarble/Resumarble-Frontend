export type PostResume = {
  job: string;
  career: string;
  resumeInfo: {
    category: string;
    content: string;
  };
};

export async function postResume(data: PostResume) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/resumes/interview-questions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("post error");
  }

  return res.json();
}
