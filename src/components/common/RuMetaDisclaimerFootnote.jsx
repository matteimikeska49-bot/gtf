import React from 'react';

export const RU_META_DISCLAIMER_TEXT = 'Instagram и Facebook принадлежат Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.';

export const RuMetaDisclaimerFootnote = () => {
  return (
    <p className="text-[11px] leading-relaxed text-zinc-600">
      {RU_META_DISCLAIMER_TEXT}
    </p>
  );
};
