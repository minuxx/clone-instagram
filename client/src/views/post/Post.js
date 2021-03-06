import icFileUpload from "../../assets/ic_file_upload.png";
import icCancelGray from "../../assets/ic_cancel_gray.png";
import imgDefaultProfile from "../../assets/img_default_profile.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../pages/Main";
import useInputs from "../../hooks/useInputs";
import { handleFirebaseUpload } from "../../utils/firebase/storage";
import { postApi } from "../../apis/post";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const userStore = useContext(UserContext);
  const [localImgs, setLocalImgs] = useState([]);
  const [form, onChange] = useInputs({
    content: "",
  });

  const { content } = form;

  const onFileChange = (e) => {
    if (localImgs.length >= 5) {
      alert("파일은 최대 5개까지 공유할 수 있습니다.");
      return;
    }

    if (e.target.files && e.target.files[0]) {
      const _file = e.target.files[0];

      handleImgFile(_file);
    }
  };

  const handleImgFile = (file) => {
    if (file === null) return;

    let reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setLocalImgs((locals) => [...locals, { file, url: reader.result }]);
      }
    };

    reader.readAsDataURL(file);
  };

  const onFileRemove = (idx) => {
    setLocalImgs((locals) => locals.filter((local, index) => index != idx));
  };

  const onPost = useCallback(async () => {
    if (content.length == 0) {
      alert("문구를 입력해주세요.");
      return;
    }

    if (localImgs.length == 0) {
      alert("사진을 1개 이상 올려주세요.");
      return;
    }

    const urlsOnFirebase = [];

    for (let localImg of localImgs) {
      const url = await handleFirebaseUpload("/post", localImg.file);
      urlsOnFirebase.push(url);
    }

    const response = await postApi({ content, urls: urlsOnFirebase });

    if (response.code == 200) {
      navigate("/home");
    }
  }, [content, localImgs]);

  return (
    <div className="border border-gray-200 rounded-sm bg-white">
      <header className="flex p-2">
        <div className="flex-1"></div>
        <div className="text-xl font-semibold flex-1 text-center">새 게시물 만들기</div>
        <div className="text-sm font-semibold text-blue-500 flex-1 flex justify-end items-center cursor-pointer" onClick={onPost}>
          공유하기
        </div>
      </header>

      <div className="grid grid-cols-3 h-96">
        <div className="flex flex-col col-span-2 border border-b-0 border-l-0 p-1">
          <div className="flex-1">
            {localImgs.length == 0 && (
              <div className="h-full flex justify-center items-center">
                <img className="w-36" src={icFileUpload} />
                <div></div>
              </div>
            )}

            {localImgs.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {localImgs.map((localImg, index) => (
                  <div key={index} className="flex relative justify-center items border">
                    <img className="relative object-contain h-40 w-40" src={localImg.url} />
                    <img className="absolute top-1 right-1 w-3 h-3" src={icCancelGray} onClick={() => onFileRemove(index)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <label
            className="ml-auto inline-flex rounded-md text-white text-sm font-bold bg-blue-500 p-1.5 cursor-pointer"
            htmlFor="feed-img"
          >
            컴퓨터에서 선택
            <input id="feed-img" className="hidden" type="file" accept="image/jpg, image/png, image/jpeg" onChange={onFileChange}></input>
          </label>
        </div>

        <div className="col-span-1 p-1 flex flex-col border border-l-0 border-b-0 border-r-0">
          <header className="flex flex-row p-2 items-center">
            <img
              className="w-9 h-9 rounded-full mr-1"
              src={userStore.profileImgUrl != null ? userStore.profileImgUrl : imgDefaultProfile}
              alt="profile image"
            />
            <div className="text-sm font-semibold">{userStore.name}</div>
          </header>
          <textarea
            className="w-full h-3/5 border-0 bg-transparent focus:ring-transparent resize-none flex-1 p-1.5"
            placeholder="문구 입력..."
            maxLength={2200}
            name="content"
            value={content}
            onChange={onChange}
          ></textarea>
          <div className="text-xs text-gray-300 ml-auto">{content.length}/2,200</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
