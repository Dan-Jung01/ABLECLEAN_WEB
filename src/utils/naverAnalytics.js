export function naverEvent(key, value) {
  try {
    // 네이버 애널리틱스: 전환/이벤트를 커스터마이징할 때 쓰는 방식(보조 로그)
    // 실제로는 wcs_do()가 방문/페이지뷰를 처리하고, 아래는 이벤트성 보조 기록
    if (window.wcs && window.wcs.cnv) {
      // cnv는 "전환"용으로도 쓰임 (키/값은 네가 통일해서 운영)
      window.wcs.cnv(key, value);
    }
  } catch (e) {
    // noop
  }
}
