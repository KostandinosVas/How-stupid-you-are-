import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import allQuestions from '@/data/questions.json';
import { Question } from '@/types';

const SESSION_SIZE = 90;

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ─── Fonts ─── */
const HomeGlobal = createGlobalStyle`
  .home-page {
    font-family: 'Rubik', sans-serif;
    background: #f8f9fb;
    min-height: 100vh;
    color: #191c1e;
  }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    user-select: none;
    font-size: 24px;
  }
`;

/* ─── Animations ─── */
const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}`;
const shimmer = keyframes`0%{background-position:200% 0}100%{background-position:-200% 0}`;

/* ─── Nav ─── */
const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(107,56,212,0.08);
  box-shadow: 0 8px 32px rgba(107,56,212,0.05);
`;
const NavInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;
const Logo = styled.span`
  font-family: 'Anybody', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #6b38d4;
  letter-spacing: -0.03em;
  cursor: default;
`;
const NavLinks = styled.div`
  display: none;
  @media(min-width:768px){display:flex;gap:1.5rem;align-items:center;}
`;
const NavLink = styled.a<{ $active?: boolean }>`
  font-weight: ${p => p.$active ? 700 : 400};
  color: ${p => p.$active ? '#6b38d4' : '#494454'};
  border-bottom: ${p => p.$active ? '3px solid #6b38d4' : '3px solid transparent'};
  padding-bottom: 2px;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: color 0.15s;
  &:hover { color: #6b38d4; }
`;
const NavRight = styled.div`display:flex;align-items:center;gap:1rem;`;
const StartBtn = styled.button`
  display: none;
  @media(min-width:768px){display:block;}
  background: #6b38d4;
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-family: 'Rubik',sans-serif;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(107,56,212,0.3);
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover{transform:scale(1.05);box-shadow:0 6px 16px rgba(107,56,212,0.4);}
  &:active{transform:scale(0.97);}
`;
const Avatar = styled.div`
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 2.5px solid #6b38d4;
  background: linear-gradient(135deg, #a78bfa, #f97316);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 0.875rem;
`;

/* ─── Main ─── */
const PageMain = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/* ─── Hero ─── */
const Hero = styled.section`
  border-radius: 2rem;
  background: linear-gradient(135deg, #6b38d4 0%, #8455ef 50%, #fd761a 100%);
  padding: 2rem;
  color: white;
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  @media(min-width:768px){padding:2.5rem;}
`;
const HeroGrid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;
  @media(min-width:768px){grid-template-columns:1fr 1fr;}
`;
const HeroContent = styled.div`display:flex;flex-direction:column;gap:1rem;`;
const AdventureBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.875rem;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  width: fit-content;
`;
const HeroTitle = styled.h1`
  font-family: 'Anybody', sans-serif;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;
const HeroSub = styled.p`
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 30rem;
`;
const HeroBtns = styled.div`display:flex;flex-wrap:wrap;gap:1rem;margin-top:0.5rem;`;
const HeroPrimaryBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #6b38d4;
  padding: 0.875rem 1.75rem;
  border-radius: 1rem;
  font-weight: 700;
  font-family: 'Rubik',sans-serif;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  transition: transform 0.15s, box-shadow 0.15s;
  &:hover{transform:scale(1.05);}
  &:active{transform:scale(0.97);}
`;
const HeroSecondaryBtn = styled.button`
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.35);
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 1rem;
  font-weight: 700;
  font-family: 'Rubik',sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover{background:rgba(255,255,255,0.2);}
`;
const HeroVisual = styled.div`
  display: none;
  @media(min-width:768px){display:flex;align-items:center;justify-content:center;}
  position: relative;
`;
const BrainEmoji = styled.div`
  font-size: 9rem;
  text-align: center;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
  animation: ${fadeUp} 0.6s 0.1s ease both;
  line-height: 1;
`;
const FloatBadge = styled.div<{ $top: string; $left?: string; $right?: string }>`
  position: absolute;
  top: ${p => p.$top};
  ${p => p.$left ? `left: ${p.$left};` : ''}
  ${p => p.$right ? `right: ${p.$right};` : ''}
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 1rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
`;

/* ─── Bento Grid ─── */
const BentoGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  @media(min-width:768px){grid-template-columns:1fr 1fr 1fr;}
`;
const BentoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media(min-width:768px){grid-column: span 2;}
`;
const SectionHeader = styled.div`display:flex;justify-content:space-between;align-items:center;`;
const SectionTitle = styled.h2`
  font-family: 'Anybody',sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.625rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #191c1e;
`;
const ViewAll = styled.span`
  font-weight: 700;
  color: #6b38d4;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover{text-decoration:underline;}
`;
const ChallengeGrid = styled.div`
  display: grid;
  gap: 1rem;
  @media(min-width:480px){grid-template-columns:1fr 1fr;}
`;
const ChallengeCard = styled.div<{ $accent: string }>`
  background: white;
  border-radius: 1rem;
  border-bottom: 4px solid ${p => p.$accent};
  padding: 1.125rem;
  box-shadow: 0 8px 32px rgba(107,56,212,0.05);
  cursor: pointer;
  transition: transform 0.15s;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  &:hover{transform:scale(1.02);}
`;
const CardTopRow = styled.div`display:flex;justify-content:space-between;align-items:flex-start;`;
const IconBox = styled.div<{ $bg: string; $color: string }>`
  width: 48px; height: 48px;
  background: ${p => p.$bg};
  border-radius: 0.75rem;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color};
  font-size: 1.5rem;
`;
const XPBadge = styled.span<{ $color: string; $bg: string }>`
  padding: 0.2rem 0.5rem;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  border-radius: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;
const CardTitle = styled.h3`font-weight:700;font-size:1rem;color:#191c1e;`;
const CardDesc = styled.p`font-size:0.8125rem;color:#494454;line-height:1.5;`;
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #edeef0;
  border-radius: 9999px;
  overflow: hidden;
`;
const ProgressFill = styled.div<{ $w: string; $color: string }>`
  height: 100%;
  width: ${p => p.$w};
  background: ${p => p.$color};
  border-radius: 9999px;
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite;
`;
const PlayBtn = styled.button<{ $bg: string }>`
  width: 100%;
  padding: 0.625rem;
  background: ${p => p.$bg};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  font-family: 'Rubik',sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover{opacity:0.9;}
`;

/* Progress / stats card */
const StatsCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(107,56,212,0.05);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  @media(min-width:480px){flex-direction:row;align-items:center;}
  position: relative;
  overflow: hidden;
`;
const CircleWrap = styled.div`position:relative;flex-shrink:0;width:128px;height:128px;margin:0 auto;`;
const CircleText = styled.div`
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
`;
const CircleScore = styled.span`
  font-family:'Anybody',sans-serif;font-size:1.5rem;font-weight:800;color:#6b38d4;
`;
const CircleLabel = styled.span`font-size:0.625rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#494454;`;
const StatsPills = styled.div`display:flex;gap:0.5rem;flex-wrap:wrap;`;
const Pill = styled.span<{ $color: string; $bg: string }>`
  padding: 0.25rem 0.75rem;
  background: ${p => p.$bg};
  color: ${p => p.$color};
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
`;
const BgIcon = styled.span`
  position:absolute;right:-1rem;top:-1rem;
  font-size:10rem;color:#6b38d4;opacity:0.05;
  pointer-events:none;
`;

/* ─── Leaderboard ─── */
const Sidebar = styled.div`display:flex;flex-direction:column;gap:1.5rem;`;
const LeaderCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(107,56,212,0.05);
  border: 1px solid #e7e8ea;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const LeaderItem = styled.div<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 1rem;
  background: ${p => p.$highlight ? 'rgba(253,118,26,0.06)' : 'transparent'};
  border: ${p => p.$highlight ? '1px solid rgba(253,118,26,0.15)' : '1px solid transparent'};
  transition: background 0.15s;
  &:hover{background:${p => p.$highlight ? 'rgba(253,118,26,0.09)' : '#f3f4f6'};}
`;
const RankNum = styled.div<{ $highlight?: boolean }>`
  font-family:'Anybody',sans-serif;
  font-weight:800;
  font-size:1.125rem;
  color:${p => p.$highlight ? '#fd761a' : '#494454'};
  width:1.5rem;
  text-align:center;
`;
const LeaderAvatar = styled.div<{ $gradient: string }>`
  width:40px;height:40px;
  border-radius:50%;
  background:${p => p.$gradient};
  display:flex;align-items:center;justify-content:center;
  color:white;font-weight:700;font-size:0.875rem;
  flex-shrink:0;
`;
const LeaderInfo = styled.div`flex:1;`;
const LeaderName = styled.div`font-weight:700;font-size:0.875rem;color:#191c1e;`;
const LeaderXP = styled.div`font-size:0.6875rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#494454;`;
const LeaderDivider = styled.div`height:1px;background:#e7e8ea;margin:0.25rem 0;`;
const LeaderFooter = styled.div`text-align:center;padding-top:0.5rem;`;

/* Badge section */
const BadgeCard = styled.div`
  background: linear-gradient(135deg, rgba(177,14,107,0.07) 0%, rgba(107,56,212,0.07) 100%);
  border: 1px solid rgba(177,14,107,0.15);
  border-radius: 1.5rem;
  padding: 1.25rem;
`;
const BadgeGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;`;
const BadgeBox = styled.div<{ $locked?: boolean }>`
  aspect-ratio: 1;
  background: ${p => p.$locked ? 'rgba(255,255,255,0.5)' : 'white'};
  border: ${p => p.$locked ? '2px dashed #cbc3d7' : 'none'};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${p => p.$locked ? 'none' : '0 2px 8px rgba(0,0,0,0.06)'};
  font-size: 1.75rem;
  transition: transform 0.15s;
  cursor: pointer;
  &:hover{transform:scale(1.1);}
`;

/* ─── Domain Cards ─── */
const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media(min-width:640px){grid-template-columns:repeat(4,1fr);}
`;
const DomainCard = styled.div<{ $gradient: string }>`
  position: relative;
  border-radius: 1.5rem;
  aspect-ratio: 4/5;
  background: ${p => p.$gradient};
  overflow: hidden;
  cursor: pointer;
  &:hover .domain-inner { transform: scale(1.04); }
  transition: transform 0.15s;
  &:hover { transform: translateY(-3px); }
`;
const DomainInner = styled.div`
  position: absolute;
  inset: 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%);
  transition: transform 0.5s ease;
`;
const DomainIcon = styled.span`font-size:2rem;margin-bottom:0.375rem;display:block;`;
const DomainName = styled.h4`color:white;font-weight:700;font-size:0.9375rem;line-height:1.3;margin-bottom:0.125rem;`;
const DomainCount = styled.p`color:rgba(255,255,255,0.7);font-size:0.75rem;`;

/* ─── Mobile Bottom Nav ─── */
const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 -4px 24px rgba(107,56,212,0.1);
  @media(min-width:768px){display:none;}
`;
const BottomItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0.375rem 1rem;
  border-radius: 0.75rem;
  background: ${p => p.$active ? 'rgba(253,118,26,0.15)' : 'transparent'};
  color: ${p => p.$active ? '#fd761a' : '#494454'};
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  span { font-size: 1.375rem; }
`;

/* ─── Data ─── */
const LEADERBOARD = [
  { rank: 1, name: 'MindMaster_99', xp: '15,420 XP', gradient: 'linear-gradient(135deg,#f97316,#ef4444)', initial: 'M', highlight: true },
  { rank: 2, name: 'LogicQueen', xp: '14,800 XP', gradient: 'linear-gradient(135deg,#6b38d4,#a78bfa)', initial: 'L' },
  { rank: 3, name: 'NeoThinker', xp: '14,150 XP', gradient: 'linear-gradient(135deg,#0ea5e9,#10b981)', initial: 'N' },
  { rank: 4, name: 'BrainHacker', xp: '13,900 XP', gradient: 'linear-gradient(135deg,#b10e6b,#f97316)', initial: 'B' },
];

const DOMAINS = [
  { name: 'Logical Reasoning', icon: '🧩', count: 25, gradient: 'linear-gradient(135deg,#1e1b4b,#4f46e5)' },
  { name: 'Spatial Intelligence', icon: '🔷', count: 24, gradient: 'linear-gradient(135deg,#0c4a6e,#0ea5e9)' },
  { name: 'Verbal Fluency', icon: '📝', count: 24, gradient: 'linear-gradient(135deg,#064e3b,#10b981)' },
  { name: 'Numerical Logic', icon: '🔢', count: 25, gradient: 'linear-gradient(135deg,#7c2d12,#f97316)' },
  { name: 'Memory', icon: '💾', count: 32, gradient: 'linear-gradient(135deg,#4a044e,#a21caf)' },
  { name: 'Processing Speed', icon: '⚡', count: 30, gradient: 'linear-gradient(135deg,#7f1d1d,#ef4444)' },
  { name: 'Emotional IQ', icon: '❤️', count: 24, gradient: 'linear-gradient(135deg,#831843,#db2777)' },
  { name: 'Creativity', icon: '🎨', count: 25, gradient: 'linear-gradient(135deg,#1c1917,#78716c)' },
];

export default function Home() {
  const router = useRouter();
  const pool = allQuestions as unknown as Question[];

  const handleStart = () => {
    const session = pickRandom(pool, Math.min(SESSION_SIZE, pool.length));
    localStorage.setItem('cpa-session', JSON.stringify(session));
    localStorage.removeItem('cpa-answers');
    router.push('/test');
  };

  return (
    <>
      <HomeGlobal />
      <Head>
        <title>IQ Quest — Level Up Your Mind</title>
        <meta name="description" content="Measure your cognitive profile across 8 dimensions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="home-page">

        {/* ─── Nav ─── */}
        <Nav>
          <NavInner>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Logo>IQ Quest</Logo>
            </div>
            <NavLinks>
              <NavLink $active href="#">Games</NavLink>
              <NavLink href="#">Levels</NavLink>
              <NavLink href="#">Leaderboard</NavLink>
              <NavLink href="#">Badges</NavLink>
            </NavLinks>
            <NavRight>
              <StartBtn onClick={handleStart}>Start Playing</StartBtn>
              <span className="material-symbols-outlined" style={{ color: '#494454', cursor: 'pointer', fontSize: '24px' }}>settings</span>
              <Avatar>K</Avatar>
            </NavRight>
          </NavInner>
        </Nav>

        {/* ─── Page body ─── */}
        <PageMain>

          {/* ─── Hero ─── */}
          <Hero>
            <HeroGrid>
              <HeroContent>
                <AdventureBadge>Adventure Awaits</AdventureBadge>
                <HeroTitle>Master Your Mind,<br />Conquer the Quest.</HeroTitle>
                <HeroSub>
                  Transform clinical assessments into a high-octane journey. Level up your cognitive skills and climb the global ranks today.
                </HeroSub>
                <HeroBtns>
                  <HeroPrimaryBtn onClick={handleStart}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>play_arrow</span>
                    Start Journey
                  </HeroPrimaryBtn>
                  <HeroSecondaryBtn>View Roadmap</HeroSecondaryBtn>
                </HeroBtns>
              </HeroContent>
              <HeroVisual>
                <BrainEmoji>🧠</BrainEmoji>
                <FloatBadge $top="10%" $right="5%">IQ: Est. 138</FloatBadge>
                <FloatBadge $top="70%" $left="0%">Win Streak: 🔥5</FloatBadge>
              </HeroVisual>
            </HeroGrid>
          </Hero>

          {/* ─── Bento ─── */}
          <BentoGrid>
            <BentoLeft>
              <SectionHeader>
                <SectionTitle>Daily Challenges</SectionTitle>
                <ViewAll>View All</ViewAll>
              </SectionHeader>
              <ChallengeGrid>
                <ChallengeCard $accent="#6b38d4">
                  <CardTopRow>
                    <IconBox $bg="rgba(107,56,212,0.1)" $color="#6b38d4">🧩</IconBox>
                    <XPBadge $color="#fd761a" $bg="rgba(253,118,26,0.1)">XP +500</XPBadge>
                  </CardTopRow>
                  <CardTitle>Pattern Recon</CardTitle>
                  <CardDesc>Identify the missing sequence in 60 seconds.</CardDesc>
                  <ProgressBar>
                    <ProgressFill $w="65%" $color="linear-gradient(90deg,#6b38d4,#8455ef)" />
                  </ProgressBar>
                  <PlayBtn $bg="#6b38d4" onClick={handleStart}>Play Now</PlayBtn>
                </ChallengeCard>
                <ChallengeCard $accent="#fd761a">
                  <CardTopRow>
                    <IconBox $bg="rgba(253,118,26,0.1)" $color="#fd761a">⚡</IconBox>
                    <XPBadge $color="#b10e6b" $bg="rgba(177,14,107,0.1)">LEGENDARY</XPBadge>
                  </CardTopRow>
                  <CardTitle>Rapid Logic</CardTitle>
                  <CardDesc>High-speed deduction test. No room for error.</CardDesc>
                  <ProgressBar>
                    <ProgressFill $w="20%" $color="linear-gradient(90deg,#fd761a,#f97316)" />
                  </ProgressBar>
                  <PlayBtn $bg="#fd761a" onClick={handleStart}>Start Challenge</PlayBtn>
                </ChallengeCard>
              </ChallengeGrid>

              {/* Stats */}
              <StatsCard>
                <CircleWrap>
                  <svg width="128" height="128" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#e7e8ea" strokeWidth="12" />
                    <circle cx="64" cy="64" r="54" fill="none" stroke="#6b38d4" strokeWidth="12"
                      strokeDasharray="339.3" strokeDashoffset="91.6" strokeLinecap="round" />
                  </svg>
                  <CircleText>
                    <CircleScore>73%</CircleScore>
                    <CircleLabel>Ranked</CircleLabel>
                  </CircleText>
                </CircleWrap>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Anybody',sans-serif", fontWeight: 700, fontSize: '1.125rem', color: '#191c1e' }}>
                    Global Standing: Top 10%
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#494454', lineHeight: 1.6 }}>
                    You&apos;ve outperformed 12,400 players this week! One more perfect game to reach Platinum League.
                  </p>
                  <StatsPills>
                    <Pill $color="#6b38d4" $bg="rgba(107,56,212,0.1)">IQ: 138 (Est.)</Pill>
                    <Pill $color="#b10e6b" $bg="rgba(177,14,107,0.1)">Win Streak: 5</Pill>
                    <Pill $color="#059669" $bg="rgba(5,150,105,0.1)">{pool.length} Questions</Pill>
                  </StatsPills>
                </div>
                <BgIcon className="material-symbols-outlined">trending_up</BgIcon>
              </StatsCard>
            </BentoLeft>

            {/* ─── Sidebar ─── */}
            <Sidebar>
              <SectionHeader>
                <h2 style={{ fontFamily: "'Anybody',sans-serif", fontWeight: 700, fontSize: '1.125rem', color: '#191c1e' }}>Leaderboard</h2>
                <span className="material-symbols-outlined" style={{ color: '#494454' }}>military_tech</span>
              </SectionHeader>
              <LeaderCard>
                {LEADERBOARD.map((p, i) => (
                  <div key={p.rank}>
                    {i > 0 && <LeaderDivider />}
                    <LeaderItem $highlight={p.highlight}>
                      <RankNum $highlight={p.highlight}>{p.rank}</RankNum>
                      <LeaderAvatar $gradient={p.gradient}>{p.initial}</LeaderAvatar>
                      <LeaderInfo>
                        <LeaderName>{p.name}</LeaderName>
                        <LeaderXP>{p.xp}</LeaderXP>
                      </LeaderInfo>
                      {p.rank === 1 && <span className="material-symbols-outlined" style={{ color: '#fd761a', fontSize: '20px' }}>workspace_premium</span>}
                    </LeaderItem>
                  </div>
                ))}
                <LeaderDivider />
                <LeaderFooter>
                  <span style={{ color: '#6b38d4', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>View Full Leaderboard</span>
                </LeaderFooter>
              </LeaderCard>

              <BadgeCard>
                <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                  <span className="material-symbols-outlined" style={{ color: '#b10e6b', fontSize: '20px' }}>trophy</span>
                  Recent Badges
                </h3>
                <BadgeGrid>
                  <BadgeBox title="Speed Demon">⚡</BadgeBox>
                  <BadgeBox title="Logic Star">⭐</BadgeBox>
                  <BadgeBox $locked title="Locked"><span className="material-symbols-outlined" style={{ color: '#cbc3d7', fontSize: '20px' }}>lock</span></BadgeBox>
                </BadgeGrid>
              </BadgeCard>
            </Sidebar>
          </BentoGrid>

          {/* ─── Explore Domains ─── */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <SectionTitle>Explore Domains</SectionTitle>
            <DomainsGrid>
              {DOMAINS.map(d => (
                <DomainCard key={d.name} $gradient={d.gradient} onClick={handleStart}>
                  <DomainInner className="domain-inner">
                    <DomainIcon>{d.icon}</DomainIcon>
                    <DomainName>{d.name}</DomainName>
                    <DomainCount>{d.count} Questions</DomainCount>
                  </DomainInner>
                </DomainCard>
              ))}
            </DomainsGrid>
          </section>

        </PageMain>

        {/* ─── Mobile Bottom Nav ─── */}
        <BottomNav>
          <BottomItem $active onClick={handleStart}>
            <span className="material-symbols-outlined">sports_esports</span>
            Games
          </BottomItem>
          <BottomItem>
            <span className="material-symbols-outlined">trending_up</span>
            Levels
          </BottomItem>
          <BottomItem>
            <span className="material-symbols-outlined">leaderboard</span>
            Ranks
          </BottomItem>
          <BottomItem>
            <span className="material-symbols-outlined">military_tech</span>
            Badges
          </BottomItem>
        </BottomNav>
      </div>
    </>
  );
}
