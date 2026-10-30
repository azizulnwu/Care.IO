"use client"
import Image from "next/image";
import React from "react";
import { FaUsers } from "react-icons/fa6";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

/* ---------------------------------------------------------------------- */
/* Presentation-only class tokens                                          */
/* ---------------------------------------------------------------------- */
const surface =
  "overflow-hidden rounded-2xl border border-[#132e49]/10 bg-white shadow-[0_1px_2px_rgba(19,46,73,0.04),0_8px_24px_-12px_rgba(19,46,73,0.12)]";
const th =
  "whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold tracking-wide text-[#132e49]/70";
const td = "px-5 py-4 align-middle text-[#132e49]";
const roleBadge =
  "inline-flex items-center rounded-full bg-[#1479C9]/10 px-2.5 py-1 text-xs font-semibold capitalize text-[#0f5f9f]";

const UsersInformation = ({ users = [] }) => {
    console.log(users)
  if (!users.length) {
    return (
      <div className={`${surface} mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center`}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1479C9]/10 text-[#1479C9]">
          <FaUsers aria-hidden="true" className="text-lg" />
        </span>
        <p className="mt-4 text-base font-semibold text-[#132e49]">
          No users found.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-full">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-[#132e49]">
          All Users
        </h2>
        <span
          aria-label={`${users.length} users`}
          className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#132e49]/8 px-2.5 py-0.5 text-sm font-semibold tabular-nums text-[#132e49]/70"
        >
          {users.length}
        </span>
      </div>

      {/* Desktop table */}
      <div
        role="region"
        aria-label="Users table"
        tabIndex={0}
        className={`${surface} hidden overflow-x-auto outline-none focus-visible:ring-4 focus-visible:ring-[#1479C9]/20 md:block`}
      >
        <table className="min-w-full text-sm">
          <caption className="sr-only">
            All users with contact details, role and join date
          </caption>
          <thead className="border-b border-[#132e49]/10 bg-[#f4f7fa]">
            <tr>
              <th scope="col" className={th}>User</th>
              <th scope="col" className={th}>Contact</th>
              <th scope="col" className={th}>Address</th>
              <th scope="col" className={th}>NID</th>
              <th scope="col" className={th}>Role</th>
              {/* <th className="px-4 py-3">Provider</th> */}
              <th scope="col" className={th}>Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#132e49]/8">
            {users.map((u) => (
              <tr
                key={u._id}
                className="transition-colors duration-150 motion-reduce:transition-none hover:bg-[#f4f7fa]/70"
              >
                <td className={td}>
                  <div className="flex items-center gap-4">
                    <Image
                      src={u.image || "https://via.placeholder.com/40"}
                      alt={u.name}
                      width={40}
                      height={30}
                      className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-[#132e49]/10"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold capitalize text-[#041320]">
                        {u.name}
                      </p>
                      <p className="truncate text-[#132e49]/65">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className={`${td} whitespace-nowrap tabular-nums`}>
                  {u.contact || "—"}
                </td>
                <td
                  className={`${td} max-w-xs truncate`}
                  title={u.address}
                >
                  {u.address || "—"}
                </td>
                <td className={`${td} whitespace-nowrap tabular-nums`}>
                  {u.nid || "—"}
                </td>
                <td className={td}>
                  <span className={roleBadge}>{u.role}</span>
                </td>
                {/* <td className="px-4 py-3 capitalize">{u.provider}</td> */}
                <td className={`${td} whitespace-nowrap tabular-nums`}>
                  {formatDate(u.createAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="grid gap-4 md:hidden">
        {users.map((u) => (
          <li key={u._id} className={`${surface} p-5`}>
            <div className="mb-4 flex items-center gap-3 border-b border-[#132e49]/10 pb-4">
              <Image
                src={u.image || "https://via.placeholder.com/48"}
                alt={u.name}
                width={50}
                height={40}
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-[#132e49]/10"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold capitalize text-[#041320]">
                  {u.name}
                </p>
                <p className="truncate text-sm text-[#132e49]/65">{u.email}</p>
              </div>
              <span className={`${roleBadge} shrink-0`}>{u.role}</span>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-[#132e49]/65">Contact</dt>
                <dd className="font-medium tabular-nums text-[#041320]">
                  {u.contact || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-[#132e49]/65">Address</dt>
                <dd className="break-words text-right font-medium text-[#041320]">
                  {u.address || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#132e49]/65">NID</dt>
                <dd className="font-medium tabular-nums text-[#041320]">
                  {u.nid || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#132e49]/65">Provider</dt>
                <dd className="font-medium capitalize text-[#041320]">
                  {u.provider}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#132e49]/65">Joined</dt>
                <dd className="font-medium tabular-nums text-[#041320]">
                  {formatDate(u.createAt)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersInformation;