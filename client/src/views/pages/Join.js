import logo from "../../assets/logo-instagram-text.png";
import facebookLogo from "../../assets/logo-facebook.png";
import icAppStore from "../../assets/ic-app-store.png";
import icGooglePlay from "../../assets/ic-google-play.png";
import useInputs from "../../hooks/useInputs";
import { signUpApi } from "../../apis";

function Join() {
  const [form, onChange] = useInputs({
    email: "",
    name: "",
    id: "",
    password: "",

    idError: "",
    passwordError: "",
    isValidate: false,
  });

  const { email, name, id, password, idError, passwordError, isValidate } =
    form;

  const onSubmit = async () => {
    try {
      const response = await signUpApi({ email, name, id, password });
      console.log("response: ");
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="container h-screen flex justify-center items-center bg-gray-50">
      <article className="flex w-2/4 justify-center">
        <div className="flex flex-col w-72">
          <div className="flex flex-col w-full border border-gray-300 bg-white items-center py-8 mb-4">
            <img src={logo} alt="logo" className="w-32 mb-7" />
            <form className="flex flex-col w-10/12 items-center mb-3">
              <input
                type="email"
                name="email"
                maxLength="75"
                value={id}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-1"
                placeholder="이메일"
              />

              <input
                type="text"
                name="name"
                maxLength="30"
                value={name}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-1"
                placeholder="성명"
              />

              <input
                type="text"
                name="name"
                maxLength="45"
                value={id}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-1"
                placeholder="사용자 이름"
              />

              <input
                type="password"
                name="password"
                maxLength="75"
                value={password}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-3"
                placeholder="비밀번호"
              />

              <button
                onClick={onSubmit}
                type="submit"
                className={`w-full ${
                  !isValidate && "bg-opacity-50"
                } bg-blue-500 rounded text-white text-xs font-bold p-1 cursor-default`}
              >
                가입
              </button>
            </form>

            <div className="w-10/12 flex flex-row justify-center items-center mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="flex-shrink-0 mx-2 text-xs font-bold text-gray-300">
                또는
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="w-10/12 flex flex-row justify-center mb-6 cursor-pointer">
              <img
                src={facebookLogo}
                className="w-4 mr-2"
                alt="facebook logo"
              />
              <div className="text-xs text-blue-900 font-bold">
                Facebook으로 로그인
              </div>
            </div>

            <div className="w-10/12 flex justify-center text-xs text-blue-900 font-light cursor-pointer">
              비밀번호를 잊으셨나요?
            </div>
          </div>

          <div className="flex flex-row w-full border border-gray-300 bg-white justify-center py-4 text-xs mb-4">
            계정이 없으신가요?
            <span className="text-xs text-blue-500 font-bold ml-1 cursor-pointer">
              가입하기
            </span>
          </div>

          <div className="flex flex-row w-full justify-center text-xs font-light mb-4">
            앱을 다운로드하세요.
          </div>

          <div className="flex flex-row w-full justify-center">
            <img
              src={icAppStore}
              alt="appstore icon"
              className="w-1/3 cursor-pointer mr-1.5"
            />
            <img
              src={icGooglePlay}
              alt="google play icon"
              className="w-1/3 cursor-pointer"
            />
          </div>
        </div>
      </article>
    </section>
  );
}

export default Join;