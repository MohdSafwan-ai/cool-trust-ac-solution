import { ImageResponse } from 'next/og';
import { business } from '@/data/business';
export const alt =
  business.name + ' — AC and appliance services in Greater Noida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#f8f9f8',
        color: '#10283d',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px',
        justifyContent: 'space-between',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 27 }}>{business.name}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 65,
          fontWeight: 700,
          letterSpacing: '-3px',
        }}
      >
        <span>AC Repair, Servicing</span>
        <span>& Installation.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 23,
          color: '#667581',
        }}
      >
        <span>{business.areas[0]}</span>
        <span>{business.phone}</span>
      </div>
    </div>,
    size,
  );
}
