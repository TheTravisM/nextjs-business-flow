import React from "react";

import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import StoreIcon from '@mui/icons-material/Store';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined';
import PowerIcon from '@mui/icons-material/Power';

export default function Criteria01() {
  return (
    <main id="criteria-01" className="modal__content content">
      <h2 className="content__title">What will this workflow be based on?</h2>

      <section className="options options--criteria-01">
        <div className="options__item options__item--company options__item--selected">
          <StoreOutlinedIcon />
          <StoreIcon />
          <span className="options__text">Company</span>
        </div>
        <div className="options__item options__item--record">
          <ArticleOutlinedIcon />
          <ArticleIcon />
          <span className="options__text">Record</span>
        </div>
        <div className="options__item options__item--website">
          <LanguageOutlinedIcon />
          <LanguageIcon />
          <span className="options__text">Website</span>
        </div>
        <div className="options__item options__item--expiration">
          <CalendarTodayIcon />
          <CalendarTodayOutlinedIcon />
          <span className="options__text">Expiration</span>
        </div>
        <div className="options__item options__item--user">
          <PersonOutlineIcon />
          <PersonOutlineOutlinedIcon />
          <span className="options__text">User</span>
        </div>
        <div className="options__item options__item--group">
          <GroupsIcon />
          <GroupsOutlinedIcon />
          <span className="options__text">Group</span>
        </div>
        <div className="options__item options__item--integration">
          <PowerOutlinedIcon />
          <PowerIcon />
          <span className="options__text">Integration</span>
        </div>
      </section>
    </main>
  );
}
