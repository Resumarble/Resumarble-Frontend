import styles from "./form.module.css";

export const Form = () => {
  return (
    <>
      <div className={styles.box}>
        <h2 className={styles.title}>면접 질문 생성기</h2>
        <p>작성한 내용을 기반으로 AI가 면접 예상 질문 목록을 생성해요.</p>
        <hr />
        <div className={styles.formContainer}>
          <form>
            <div className={styles.jobContainer}>
              <label htmlFor="select-job">
                <b>직업을 선택하세요.</b>
              </label>
              <select required id="select-job">
                <option value="select" disabled selected>
                  선택
                </option>
                <option value="job">직업1</option>
              </select>
            </div>

            <div className={styles.careerContainer}>
              <label htmlFor="select-career">
                <b>경력을 선택하세요.</b>
              </label>
              <select required id="select-career">
                <option value="select" disabled selected>
                  선택
                </option>
                <option value="job">신입</option>
              </select>
            </div>

            <div className={styles.questionContainer}>
              <label htmlFor="select-question">
                <b>예상 질문으로 받고 싶은 항목을 선택하세요.</b>
              </label>
              <select required id="select-question">
                <option value="select" disabled selected>
                  선택
                </option>
                <option value="introduce">자기소개</option>
              </select>
            </div>

            <div className={styles.textBoxContainer}>
              <textarea
                required
                placeholder={`내용을 입력해주세요. \n(예상 질문 목록으로 선택한 내용과 유관한 내용 기입)`}
              />
            </div>
            <button className={styles.btn}>제출</button>
          </form>
        </div>
        {/* // TODO 추후 서비스 확장 시 질문 여러개 어떻게 레이아웃 구성할 지 고민해보기 */}
      </div>
    </>
  );
};
