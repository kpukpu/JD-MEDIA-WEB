import React, {  } from "react";
import "./aboutus.css";

import headerImage from "../assets/about-us-image.png";
import teamPhoto from "../assets/team_photo.png";


const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="header-image-container">
                <img src={headerImage} alt="Header Banner" className="header-image" />
            </div>

            <div className="content-container">
                <div className="text-container">
                    <h1>ABOUT US</h1>
                    <p>
                        JD MEDIA는 창의적이고 혁신적인 아이디어로 브랜드의 가치를 극대화하는 종합 미디어 컴퍼니입니다. 광고 분야에서는 브랜드 아이덴티티 구축부터 디지털 마케팅, 전통 매체 광고, 크리에이티브 콘텐츠 개발까지 통합적인 마케팅 솔루션을 제공하며, 행사 부문에서는 기업 컨퍼런스, 제품 런칭 이벤트, 문화·예술 행사, 전시회 등 다양한 규모와 성격의 행사를 성공적으로 기획·운영하고 있습니다. 또한 엔터테인먼트 영역에서는 콘텐츠 기획 및 제작, 아티스트 매니지먼트, 공연 프로듀싱, 미디어 콘텐츠 유통까지 포괄하는 종합 엔터테인먼트 서비스를 선보이고 있습니다. 각 분야별 풍부한 경험과 전문성을 갖춘 크리에이터들이 시장 트렌드를 선도하는 차별화된 전략을 바탕으로 고객 맞춤형 원스톱 서비스를 제공하며, 일관성 있는 브랜드 경험을 통해 고객의 기대를 뛰어넘는 최상의 결과를 창출합니다. JD MEDIA는 단순한 서비스 제공을 넘어 고객의 비즈니스 파트너로서 브랜드의 성공적인 성장과 지속가능한 발전을 위해 끊임없이 도전하고 혁신하며, 창의성과 전문성을 바탕으로 고객과 함께 새로운 가치를 만들어가는 믿을 수 있는 동반자입니다.
                    </p>
                </div>

                <div className="image-container">
                    <img src={teamPhoto} alt="Team in a Meeting" className="team-photo" />
                </div>
            </div>
            


            </div>

    );
};

export default AboutUs;
