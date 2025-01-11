import React, { useState } from 'react';
import './Authform.css';

//회원가입 필요 데이터
interface FormData {
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}


function AuthForm() {
    //로그인, 회원가입, 비밀번호/아이디 찾기, 리셋 화면 -> login이 기본 화면임
    //setCurrentForm 클릭이벤트에 따라 currentForm 값을 변경하여 화면 전환을 수행
  const [currentForm, setCurrentForm] = useState<'login' | 'signup' | 'find' | 'reset'>('login');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });
  //인증 버튼 클릭 시 비밀번호 표시
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  //handler 함수 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //e.target에서 name(필드 이름)과 value(입력된 값)를 추출합니다.
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  /*
    인증 관련 작업에서 호출됩니다.
    주어진 message를 받아 간단한 알림 창을 표시합니다.
  */
  const handleVerification = (message: string) => {
    alert(message);
  };


// 회원가입 폼 제출 시 호출됩니다.
// 동작 흐름:
// e.preventDefault()로 폼의 기본 제출 동작을 막습니다.
// 비밀번호와 비밀번호 확인(passwordConfirm)이 일치하지 않으면 오류 메시지를 표시하고 종료합니다.
// 일치할 경우 입력 데이터를 콘솔에 출력하고 성공 메시지를 표시합니다.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }
    console.log('회원가입 요청:', formData);
    alert('회원가입이 완료되었습니다!');
  };

  return (

//     **currentForm === 'login'**일 때 렌더링됩니다.
// 사용자 입력 필드: 아이디, 비밀번호
// "회원가입" 클릭 시 → setCurrentForm('signup') 호출로 회원가입 화면 전환.
// "아이디/비밀번호 찾기" 클릭 시 → setCurrentForm('find') 호출로 아이디/비밀번호 찾기 화면 전환.
    <div className="AuthForm">
      {/* 로그인 화면 */}
      {currentForm === 'login' && (
        <form>
          <h2>로그인</h2>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button>로그인</button>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <a href="#" onClick={() => setCurrentForm('signup')}>
            회원가입
          </a>
          <a href="#" onClick={() => setCurrentForm('find')}>
            아이디/비밀번호 찾기
          </a>
          </div>
        </form>
      )}

{/* **currentForm === 'signup'**일 때 렌더링됩니다.
사용자 입력 필드:
이름, 전화번호, 비밀번호, 비밀번호 확인
입력 값 변경: handleInputChange로 상태 업데이트.
폼 제출: handleSubmit 호출로 데이터 유효성 검사 및 처리.
"로그인" 클릭 시 → setCurrentForm('login') 호출로 로그인 화면 전환. */}
      {/* 회원가입 화면 */}
      <div className='auth-container'>
      {currentForm === 'signup' && (
        <form onSubmit={handleSubmit} style={{textAlign:'center'}} className='signup-form'>
          <h2>회원가입</h2>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange}
            style={{display: 'block', margin: '3px auto', width: '80%', padding: '10px' }}
          />
          <br/>
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleInputChange}
            style={{display: 'block', margin: '3px auto', width: '80%', padding: '10px' }}
          />
          <br/>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleInputChange}
            style={{display: 'block', margin: '3px auto', width: '80%', padding: '10px' }}
          />
          <br/>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            style={{display: 'block', margin: '3px auto', width: '80%', padding: '10px' }}
          />
          <br/>
          <button type="submit">회원가입</button>
          <br/>
          <a href="#" onClick={() => setCurrentForm('login')}>
            로그인 화면으로 돌아가기기
          </a>
        </form>
      )}
      </div>


{/* currentForm === 'find'**일 때 렌더링됩니다.
버튼 동작:
"아이디 찾기" → 인증 메시지 표시.
"비밀번호 찾기" → setCurrentForm('reset') 호출로 비밀번호 재설정 화면 전환.
"로그인 화면으로 돌아가기" 클릭 시 → setCurrentForm('login') 호출. */}
      {/* 아이디/비밀번호 찾기 화면 */}
      <div>
      {currentForm === 'find' && (
        <form>
          <h2>아이디/비밀번호 찾기</h2>
          <button onClick={() => handleVerification('아이디 찾기 인증번호를 보냈습니다.')}>
            아이디 찾기
          </button>
          <button onClick={() => setCurrentForm('reset')}>
            비밀번호 찾기
          </button>
          <a href="#" onClick={() => setCurrentForm('login')}>
            로그인 화면으로 돌아가기
          </a>
        </form>
      )}
      </div>

{/* currentForm === 'reset'**일 때 렌더링됩니다.
"인증번호 보내기" 버튼:
인증 메시지 표시.
setNewPasswordVisible(true) 호출로 "새 비밀번호 입력 필드" 표시.
"로그인 화면으로 돌아가기" 클릭 시 → setCurrentForm('login') 호출. */}
      {/* 비밀번호 재설정 화면 */}
      {currentForm === 'reset' && (
        <form>
          <h2>비밀번호 재설정</h2>
          <button
            onClick={() => {
              handleVerification('비밀번호 찾기 인증번호를 보냈습니다.');
              setNewPasswordVisible(true);
            }}
          >
            인증번호 보내기
          </button>
          {newPasswordVisible && (
            <input type="password" placeholder="새 비밀번호" />
          )}
          <a href="#" onClick={() => setCurrentForm('login')}>
            로그인 화면으로 돌아가기
          </a>
        </form>
      )}
    </div>
  );
}

export default AuthForm;
