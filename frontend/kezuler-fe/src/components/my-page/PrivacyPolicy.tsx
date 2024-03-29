import React from 'react';

import PolicyAppBar from '../common/PolicyAppBar';

import KezulerLogo from 'src/assets/logo192.png';
import 'src/styles/policy.scss';

function PrivacyPolicy() {
  const policies = [
    {
      title: '1. 개인정보 수집 항목',
      text: ' 귀하는 본 플랫폼에 가입하는 시점의 정보를 당사에게 제공하며, 및 귀하가 이용자 프로필에서 공개하는 정보가 이에 해당합니다. 귀하가 귀하의 소셜네트워크 계정(예: Facebook, Google) 정보를 이용하여 본 플랫폼을 이용한다고 등록하는 경우, 귀하는 귀하의 이용자명 및 공개 프로필을 당사에게 제공하게 되거나 귀하의 소셜네트워크가 동 정보를 당사에게 제공하는 것을 허용하게 됩니다. 또한, 당사는 귀하의 액세스 토큰 및 참조 URL, 이름, 휴대폰 번호, 캘린더 스케줄 정보와 같은 특정 정보를 회원가입, 원활한 고객상담, 각종 서비스 등 기본적인 서비스 제공을 위한 개인정보를 수집할 수 있습니다.',
    },
    {
      title: '2. 서비스 이용과정에서 사용자로부터 수집하는 개인정보',
      text: ' 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 브라우저 유형 및 설정, 운영체제, 시스템 활동 정보가 생성되어 수집될 수 있습니다. 구체적으로, \n 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를 저장(수집)하거나, \n 2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못하도록 안전하게 변환하여 수집합니다.\n 3)구글 캘린더 연동을 통해 캘린더 스케줄 시간 정보를 가져와서 캘린더 정보를 보면서 시간 선택할 수 있거나 서비스내 확정된 미팅을 캘린더에 자동 추가/삭제합니다. \n 다만, 귀하는 위와 같은 정보의 수집을 원하지 않으시는 경우 거부할 수 있습니다.  예를 들어, 쿠키란 이용자가 웹사이트를 접속할 때에 해당 웹사이트에서 이용자의 웹브라우저를 통해 이용자의 PC에 저장하는 매우 작은 크기의 텍스트 파일입니다. 이후 이용자가 다시 웹사이트를 방문할 경우 웹사이트 서버는 이용자 PC에 저장된 쿠키의 내용을 읽어 이용자가 설정한 서비스 이용 환경을 유지하여 편리한 인터넷 서비스 이용을 가능케 합니다. 또한 방문한 서비스 정보, 서비스 접속 시간 및 빈도, 서비스 이용 과정에서 생성된 또는 제공(입력)한 정보 등을 분석하여 이용자의 취향과 관심에 특화된 서비스(광고 포함)를 제공할 수 있습니다. 이용자는 쿠키에 대한 선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우 로그인이 필요한 일부 서비스의 이용에 불편이 있을 수 있습니다.',
    },
    {
      title: '3. 개인정보 수집 목적 및 수집한 개인정보의 이용',
      text: ' 당사는 당사가 귀하에 대해 수집하는 정보를 다음과 같은 방식으로 이용합니다. \n - 당사 서비스의 변경 사항을 귀하에게 통보하기 위하여 \n - 귀하에게 이용자 지원을 제공하기 위하여 \n- 귀하가 제공받는 콘텐츠를 개인화하고, 귀하의 관심사에 해당하는 맞춤형 콘텐츠를 귀하에게 제공하기 위하여\n- 귀하가 다른 이용자들과 이용자 콘텐츠를 공유하고 상호작용할 수 있도록 하기 위하여\n- 귀하와 의사소통하기 위하여\n- 당사의 약관 및 정책을 집행하기 위하여\n- 장애처리를 포함하여 본 플랫폼을 관리하기 위하여\n- 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.\n- 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.\n- 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.',
    },
    {
      title: '4. 개인정보에 대한 보안',
      text: ' 당사는 귀하의 정보가 본 정책에 따라 안전하게 처리되도록 조치를 취합니다.\n - 관리적 조치 : 내부관리계획 수립∙시행, 정기적 직원 교육 등 \n - 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치 \n - 물리적 조치 : 전산실, 자료보관실 등의 접근통제',
    },
    {
      title: '5. 개인정보 보유기간',
      text: ' 당사는 귀하에게 서비스를 제공하기 위하여 필요한 기간 동안 귀하의 정보를 보유합니다. 귀하에게 서비스를 제공하기 위한 목적으로 귀하의 정보를 보유할 필요가 없어지면, 당사는 해당 정보를 보유할 적법한 사업목적이 존재하는 기간에 한하여 귀하의 정보를 보유합니다. 단, 당사의 법적 의무의 이행 또는 당사의 법적 청구의 성립, 행사 또는 방어를 위하여 당사가 전술한 기간을 초과하여 귀하의 정보를 보유할 수 있는 경우가 있을 수 있습니다.  귀하가 본 플랫폼의 이용을 종료한 이후, 당사는 귀하의 정보를 통합하여 익명으로 저장합니다.  올렌다는 원칙적으로 이용자의 개인정보를 케:줄러의 회원 탈퇴 시 지체없이 파기하고 있습니다. ',
    },
    {
      title: '6. 변경',
      text: ' 당사는 본 플랫폼을 통해 공지를 하는 방식으로 본 정책의 주요 변경사항을 모든 이용자에게 통지합니다. 단, 귀하는 변경사항을 확인하기 위해 본 정책을 정기적으로 확인해야 합니다. 당사는 본 정책의 효력발생일을 반영한 “최근 개정”일자 또한 본 정책의 상단에 업데이트합니다.  귀하가 정책의 개정 일자 이후에 본 플랫폼에 계속 접속하거나 이를 이용하는 것은 귀하가 개정된 정책에 동의하였음을 의미합니다. 귀하가 개정된 정책에 동의하지 않는다면 본 플랫폼에 대한 접속 및 이용을 중단해야 합니다.',
    },
    {
      title: '7. 개인정보 보호책임자 및 담당자 안내',
      text: ' 케:줄러는 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위하여 아래와 같이 개인정보 보호책임자 및 담당자를 지정하고 있습니다. \n 개인정보 보호책임자: 오태인 \n 직위: 책임자 \n Email: kezuler@gmail.com',
    },
    {
      title: '8. 캘린더 정보 접근과 권한',
      text: ' 구글 캘린더에 https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.events 를 사용하여 회사의 미팅 시간 선택 화면에 사용자의 캘린더 스케줄의 정보를 표시합니다.\n사용자가 웹을 통해 캘린더에 저장된 시간 외에 예약을 진행할 수 있으며 예약 진행시 변경 사항을 Google 캘린더와 동기화할 수 있도록 합니다.\n 1)스케줄 생성 : 확정이 되면 해당 미팅 일정을 자동으로 캘린더에 저장합니다. \n 2)스케줄 변경 : 미팅 정보가 수정되면 해당 미팅 일정을 자동으로 업데이트합니다.\n 3)스케줄 삭제 : 미팅 일정이 삭제되면 자동으로 일정을 삭제합니다.',
    },
    {
      title: '9. 개인정보의 파기',
      text: ' 케:줄러는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.  다만, 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다. 관련 법령에서 일정기간 정보의 보관을 규정하는 경우는 아래와 같습니다. 케:줄러는 이 기간 동안 법령의 규정에 따라 개인정보를 보관하며, 본 정보를 다른 목적으로는 절대 이용하지 않습니다. \n - 통신비밀보호법 - 로그인 기록 : 3개월 \n - 국세기본법 - 법이 규정하는 모든 거래에 관한 장부 및 증빙서류 : 5년 \n - 전자금융거래법 - 전자금융 거래에 관한 기록 : 5년 \n 회원탈퇴, 서비스 종료, 이용자에게 동의 받은 개인정보 보유기간의 도래와 같이 개인정보의 수집 및 이용목적이 달성된 개인정보는 재생이 불가능한 방법으로 파기하고 있습니다. 법령에서 보존의무를 부과한 정보에 대해서도 해당 기간 경과 후 지체없이 재생이 불가능한 방법으로 파기합니다.  전자적 파일 형태의 경우 복구 및 재생이 되지 않도록 기술적인 방법을 이용하여 안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식 등으로 파기합니다.',
    },
    {
      title: '9. 이용자의 권리와 행사 방법',
      text: ' 이용자는 언제든지 ‘회원정보’에서 자신의 개인정보를 조회하거나 수정할 수 있습니다.  이용자는 언제든지 ‘회원탈퇴’ 등을 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.  이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.',
    },
  ];

  return (
    <>
      <PolicyAppBar title={'개인정보 처리방침'} />
      <div className={'policy-wrapper'}>
        <div className={'policy-top'}>
          <div className={'policy-top-kezuler'}>
            <img src={KezulerLogo} />
            케:줄러
          </div>
          <div className={'policy-top-title'}>개인정보 처리방침</div>
        </div>
        <div className={'policy-desc'}>
          <div className={'policy-desc-title'}>케:줄러 개인정보처리방침</div>
          <div className={'policy-desc-text'}>
            케:줄러에서 제공되는 제품, 서비스, 기능(이하 통칭하여 ‘서비스’)을
            사용해 주셔서 감사합니다. 본 약관은 주식회사 올렌다(이하 ‘올렌다’)가
            운영하는 케:줄러(
            <a href="https://www.kezuler.com">www.kezuler.com</a>)을 통해
            제공되는 서비스를 이용하기 위하여 회원으로 가입한 자와 올렌다간의
            권리∙의무 및 제반 절차를 확정하고 이를 이행함으로써 상호 발전을
            도모하는 것을 그 목적으로 합니다.
          </div>
        </div>
        {policies.map((policy) => (
          <div key={policy.title} className={'policy-subpart'}>
            <div className={'policy-sub-title'}>{policy.title}</div>
            <div className={'policy-sub-text'}>{policy.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrivacyPolicy;
