/* eslint-disable react-refresh/only-export-components */
import { Crown, FileText, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import PageBanner from '@/components/PageBanner';
import { HERO_IMAGE } from '@/data/temple';

export type Member = {
  name: string;
  role?: string;
  photo: string;
};

type MemberDetails = Omit<Member, 'photo'>;

type Committee = {
  title: string;
  malayalam?: string;
  members: Member[];
  icon: typeof Crown;
};

const PORTRAIT_IMAGES = [
  'https://images.pexels.com/photos/38889922/pexels-photo-38889922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37605831/pexels-photo-37605831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38889918/pexels-photo-38889918.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7580837/pexels-photo-7580837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39974539/pexels-photo-39974539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37605830/pexels-photo-37605830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/15527450/pexels-photo-15527450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36645466/pexels-photo-36645466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12912940/pexels-photo-12912940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3400560/pexels-photo-3400560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4687575/pexels-photo-4687575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26834968/pexels-photo-26834968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32358666/pexels-photo-32358666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
] as const;

function addPortraits(members: MemberDetails[], offset = 0): Member[] {
  return members.map((member, index) => ({
    ...member,
    photo: PORTRAIT_IMAGES[(index + offset) % PORTRAIT_IMAGES.length],
  }));
}

export const OFFICE_BEARERS = addPortraits([
  { name: 'P. Radhakrishnan', role: 'President' },
  { name: 'Sobha P. Menon', role: 'Vice President' },
  { name: 'T. Unnikrishnan', role: 'General Secretary' },
  { name: 'K. G. Mohandas', role: 'Secretary' },
  { name: 'Sunil Mathrupilli', role: 'Secretary' },
  { name: 'P. R. Vasanthakumar', role: 'Treasurer' },
]);

export const COMMITTEE_MEMBERS = addPortraits([
  { name: 'Balakrishnan Anchathu', role: 'Committee Member' },
  { name: 'R. V. Krishnakumar', role: 'Committee Member' },
  { name: 'P. Pithambaran', role: 'Committee Member' },
  { name: 'P. Shivadas', role: 'Committee Member' },
  { name: 'C. Parameswaran', role: 'Committee Member' },
  { name: 'Rajeev Ramanathan', role: 'Committee Member' },
  { name: 'Geetha Damotharan', role: 'Committee Member' },
  { name: 'P. K. Ushambika', role: 'Committee Member' },
  { name: 'C. Sunilkumar', role: 'Committee Member' },
  { name: 'Deepak D. Menon', role: 'Committee Member' },
  { name: 'M. V. Ravi', role: 'Committee Member' },
  { name: 'Rakesh Iykara', role: 'Committee Member' },
  { name: 'Sunilkumar Chariyil', role: 'Committee Member' },
  { name: 'Prashanth P. P.', role: 'Committee Member' },
  { name: 'Manoj Menon', role: 'Committee Member' },
], 6);

export const OTHER_COMMITTEES: Committee[] = [
  {
    title: 'Patrons',
    malayalam: 'രക്ഷാധികാരികൾ',
    icon: Crown,
    members: addPortraits([
      { name: 'N. M. Thrivikraman Namboothiri', role: 'Kshethra Thanthri' },
      { name: 'K. R. Raman Namboothiri', role: 'Devaswom Manager' },
      { name: 'K. R. Ravi Namboothiri', role: 'Devaswom Manager' },
      { name: 'N. K. Narayanan Namboothiri', role: 'President' },
    ]),
  },
  {
    title: 'Advisory Committee',
    malayalam: 'ഉപദേശക സമിതി',
    icon: ShieldCheck,
    members: addPortraits([
      { name: 'K. R. Rohith Namboothiri', role: 'Shanthi Representative' },
      { name: 'Ramawarrior', role: 'Kazhakam Representative' },
      { name: 'Dr. N. V. Krishnan' },
      { name: 'T. P. Sukumaran' },
    ], 4),
  },
  {
    title: 'Auditors',
    icon: FileText,
    members: addPortraits([{ name: 'K. Jayan Thamban' }, { name: 'P. T. Sudhakaran' }], 8),
  },
];

export type AdministrationGroup = { title: string; members: Member[] };
export const ADMINISTRATION_CONTENT_KEY = 'temple-cms-administration-content';
export const ADMINISTRATION_GROUPS: AdministrationGroup[] = [
  { title: 'Committee Members', members: [...OFFICE_BEARERS, ...COMMITTEE_MEMBERS] },
  ...OTHER_COMMITTEES.map(({ title, members }) => ({ title, members })),
];

function getAdministrationGroups(): AdministrationGroup[] {
  if (typeof window === 'undefined') return ADMINISTRATION_GROUPS;
  const saved = window.localStorage.getItem(ADMINISTRATION_CONTENT_KEY);
  if (!saved) return ADMINISTRATION_GROUPS;
  try {
    const groups = JSON.parse(saved);
    return Array.isArray(groups) && groups.length === ADMINISTRATION_GROUPS.length && groups.every((group) => group?.title && Array.isArray(group.members))
      ? groups
      : ADMINISTRATION_GROUPS;
  } catch {
    return ADMINISTRATION_GROUPS;
  }
}

function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  return (
    <article className={`group rounded-2xl border border-secondary-300 bg-[#fffaf0] p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${featured ? 'p-5 sm:p-6' : ''}`}>
      <img
        src={member.photo}
        alt=""
        className={`mx-auto aspect-square rounded-xl object-cover ring-2 ring-secondary-100 transition duration-300 group-hover:ring-secondary-400 ${featured ? 'h-36 w-36 sm:h-40 sm:w-40' : 'h-28 w-28 sm:h-32 sm:w-32'}`}
      />
      <div className="mt-3">
        <h3 className={`font-serif font-semibold leading-tight text-primary-900 ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>{member.name}</h3>
        {member.role && <p className={`mx-auto mt-2 w-fit rounded-full bg-primary-700 px-3 py-1 font-semibold text-secondary-100 ${featured ? 'text-sm' : 'text-xs'}`}>{member.role}</p>}
      </div>
    </article>
  );
}

function CommitteePanel({ committee }: { committee: Committee }) {
  const Icon = committee.icon;

  return (
    <section className="rounded-3xl border border-secondary-300 bg-[#fffaf0] p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-secondary-200 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-secondary-300">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl font-semibold text-primary-800">{committee.title}</h2>
          {committee.malayalam && <p className="text-sm font-medium text-accent-700">{committee.malayalam}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {committee.members.map((member) => <MemberCard key={member.name} member={member} />)}
      </div>
    </section>
  );
}

export default function AdministrationPage() {
  const [groups] = useState(getAdministrationGroups);
  const committeeMembers = groups.find((group) => group.title === 'Committee Members')?.members ?? ADMINISTRATION_GROUPS[0].members;
  const otherCommittees = OTHER_COMMITTEES.map((committee) => ({
    ...committee,
    members: groups.find((group) => group.title === committee.title)?.members ?? committee.members,
  }));

  return (
    <>
      <PageBanner
        eyebrow="Temple Committee"
        title="Administration"
        description="Management committees of Thrippayya Thrimoorthi Temple."
        image={HERO_IMAGE}
      />

      <main className="mx-auto max-w-[1400px] space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="committee-title" className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="hidden h-px flex-1 bg-secondary-400 sm:block" />
            <h2 id="committee-title" className="rounded-full bg-primary-800 px-8 py-3 text-center font-serif text-2xl font-semibold text-neutral-50 shadow-md sm:text-3xl">Committee Members</h2>
            <span className="hidden h-px flex-1 bg-secondary-400 sm:block" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {committeeMembers.slice(0, 2).map((member) => <MemberCard key={member.name} member={member} featured />)}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {committeeMembers.slice(2, 6).map((member) => <MemberCard key={member.name} member={member} featured />)}
          </div>
        </section>

        <section aria-label="Committee member directory" className="space-y-8 rounded-3xl border border-secondary-300 bg-[#fffaf0] p-5 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {committeeMembers.slice(6).map((member) => <MemberCard key={member.name} member={member} />)}
          </div>
        </section>

        <section aria-labelledby="other-committees-title" className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="hidden h-px flex-1 bg-secondary-400 sm:block" />
            <h2 id="other-committees-title" className="rounded-full bg-primary-800 px-7 py-3 text-center font-serif text-2xl font-semibold text-neutral-50 shadow-md sm:text-3xl">Other Committees</h2>
            <span className="hidden h-px flex-1 bg-secondary-400 sm:block" />
          </div>
          <div className="grid gap-6">
            {otherCommittees.map((committee) => <CommitteePanel key={committee.title} committee={committee} />)}
          </div>
        </section>
      </main>
    </>
  );
}
