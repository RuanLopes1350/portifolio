# Portfolio Reformulation & Admin Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio into a modern, high-end Next.js 15 fullstack website with an admin panel (`/admin`) powered by **better-auth** for dynamic CRUD management of projects, social links, and conditional expandable screenshot galleries.

**Architecture:** A unified Next.js 15 (App Router) fullstack app deployed on Vercel. Uses MongoDB (via Mongoose) as the database for `better-auth` tables, `Project`, `SocialLink`, and `About` schemas. Features Tailwind CSS v4, Lucide Icons, Framer Motion for glassmorphism aesthetics, and a conditional `<ProjectGallery />` component that renders expandable drawers only when projects contain screenshot URLs.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Better-Auth, Mongoose, Lucide React, Vercel.
