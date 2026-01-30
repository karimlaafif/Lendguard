import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Run Python prediction script
        const pythonScriptPath = path.join(process.cwd(), 'scripts', 'predict.py')

        const pythonProcess = spawn('python', [
            pythonScriptPath,
            JSON.stringify(body)
        ])

        let result = ''
        let error = ''

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString()
        })

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString()
        })

        return new Promise<NextResponse>((resolve) => {
            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error('Python script error:', error)
                    resolve(NextResponse.json(
                        { error: 'Prediction failed', details: error },
                        { status: 500 }
                    ))
                } else {
                    try {
                        const prediction = JSON.parse(result)
                        if (prediction.error) {
                            resolve(NextResponse.json(
                                { error: prediction.error },
                                { status: 400 }
                            ))
                        } else {
                            resolve(NextResponse.json(prediction))
                        }
                    } catch (e) {
                        resolve(NextResponse.json(
                            { error: 'Failed to parse prediction result', raw: result },
                            { status: 500 }
                        ))
                    }
                }
            })
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}
