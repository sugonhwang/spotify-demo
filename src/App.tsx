import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import SearchWithKeywordPage from "./pages/SearchKeywordPage/SearchWithKeywordPage";

import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import LazyLoading from "./common/components/LazyLoading";
import useExchangeToken from "./hooks/useExchangeToken";
import PlayListDetailPage from "./pages/PlayListDetailPage/PlayListDetailPage";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));

/** 로직
 * 사이드 바 있어야 함 (플레이리스트, 메뉴)
 * 홈페이지: /
 * 서치 페이지: /search
 * 서치 결과 페이지: /search/:keyword
 * 플레이리스트 디테일 페이지: /playlist/:id
 * (모바일버전) 플레이 리스트 보여주는 페이지: /playlist
 */

function App() {
  // 유저 로그인 연결
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  // 토큰 교환 훅
  const { mutate: exchangeToken } = useExchangeToken();
  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <LazyLoading />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
            <Route path="playlist/:id" element={<PlayListDetailPage />} />
            <Route path="playlist" element={<PlaylistPage />} />
            <Route path="callback" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
